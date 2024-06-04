import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Login from "../pages/login/Login.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import SearchInput from "../components/sidebar/SearchInput.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <h2>HELLO!!</h2>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/Login">
                <Login/>
            </ComponentPreview>
            <ComponentPreview path="/Sidebar">
                <Sidebar/>
            </ComponentPreview>
					<ComponentPreview path="/SearchInput">
						<SearchInput/>
					</ComponentPreview>
				</Previews>
    )
}

export default ComponentPreviews