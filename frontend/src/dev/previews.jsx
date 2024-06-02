import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Login from "../pages/login/Login.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";

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
        </Previews>
    )
}

export default ComponentPreviews