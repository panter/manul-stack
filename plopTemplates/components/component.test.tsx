import "jest";
import { shallow } from 'enzyme';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import {{name}} from '../{{name}}';

describe('{{name}}', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<{{name}}/>);
        expect(wrapper.find(<div />)).toBeTruthy();

        // const tree = renderer.create(<{{name}}/>).toJSON();
        // expect(tree).toMatchSnapshot();
    });

});
