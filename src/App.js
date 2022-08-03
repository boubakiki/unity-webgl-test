import logo from './logo.svg';
import './App.css';

import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
	const { unityProvider } = useUnityContext({
		loaderUrl: "unity/Sample.loader.js",
		dataUrl: "unity/Sample.data",
		frameworkUrl: "unity/Sample.framework.js",
		codeUrl: "unity/Sample.wasm",
	});

	return (
		<Unity
			unityProvider={unityProvider}
			style={{ width: 1920, height: 1080 }}
		/>
	);
}

export default App;
