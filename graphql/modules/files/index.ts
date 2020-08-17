import { schema } from "nexus";
import { v4 } from "uuid";

import Aws from "aws-sdk";
const { S3_SECRET_ACCESS_KEY, S3_ENDPOINT, S3_ACCESS_KEY_ID } = process.env;
const s3 = new Aws.S3({
  endpoint: S3_ENDPOINT,
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  // needed for minio
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

import { GraphQLUpload, UserInputError } from "apollo-server-core";
import type { FileUpload } from "graphql-upload";

const BUCKET_NAME = "manul-stack-example";

// see https://github.com/graphql-nexus/nexus/issues/844#issuecomment-666699822
export type UploadRoot = Promise<FileUpload>;
schema.scalarType({
  // Why we need the bang: https://github.com/apollographql/apollo-server/blob/570f548b88750a06fbf5f67a4abe78fb0f870ccd/packages/apollo-server-core/src/index.ts#L49-L56
  ...GraphQLUpload!,
  rootTyping: "UploadRoot",
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.string("adminUploadFile", {
      args: {
        file: "Upload",
        fileName: schema.stringArg({
          required: false,
        }),
        folderName: schema.stringArg({
          required: false,
        }),
      },
      async resolve(root, { file, fileName, folderName = "uploads" }) {
        if (!file) {
          throw new UserInputError("missing file");
        }
        const { mimetype, createReadStream, filename } = await file;

        // force extension
        const name = fileName ?? filename;
        const extension = mimetype?.split("/")[1];
        const fullName = name.endsWith(extension) ? name : name + extension;

        const stream = createReadStream();
        const Key = `${folderName}/${v4()}-${fullName}`;
        const result = await s3
          .upload({
            ACL: "public-read",
            Bucket: BUCKET_NAME,
            Key,
            Body: stream,
            ContentType: mimetype,
          })
          .promise();

        return result.Location;
      },
    });
  },
});
