import logo from './logo.svg';
import './App.css';

import React, { useState, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { Storage } from "aws-amplify";

function App() {
	const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
		loaderUrl:
			"https://unitywebglfile164239-dev.s3.ap-northeast-2.amazonaws.com/public/Sample.loader.js",
		dataUrl:
			"https://unitywebglfile164239-dev.s3.ap-northeast-2.amazonaws.com/public/Sample.data",
		frameworkUrl:
			"https://unitywebglfile164239-dev.s3.ap-northeast-2.amazonaws.com/public/Sample.framework.js",
		codeUrl:
			"https://unitywebglfile164239-dev.s3.ap-northeast-2.amazonaws.com/public/Sample.wasm",
	});

	const loadingPercentage = Math.round(loadingProgression * 100);

	const [devicePixelRatio, setDevicePixelRatio] = useState(
		window.devicePixelRatio,
	);

	const handleChangePixelRatio = useCallback(
		function () {
			// A function which will update the device pixel ratio of the Unity
			// Application to match the device pixel ratio of the browser.
			const updateDevicePixelRatio = function () {
				setDevicePixelRatio(window.devicePixelRatio);
			};
			// A media matcher which watches for changes in the device pixel ratio.
			const mediaMatcher = window.matchMedia(
				`screen and (resolution: ${devicePixelRatio}dppx)`,
			);
			// Adding an event listener to the media matcher which will update the
			// device pixel ratio of the Unity Application when the device pixel
			// ratio changes.
			mediaMatcher.addEventListener("change", updateDevicePixelRatio);
			return function () {
				// Removing the event listener when the component unmounts.
				mediaMatcher.removeEventListener(
					"change",
					updateDevicePixelRatio,
				);
			};
		},
		[devicePixelRatio],
	);

	return (
		<Unity
			unityProvider={unityProvider}
			style={{ width: 1920, height: 1080 }}
			devicePixelRatio={devicePixelRatio}
		/>
	);
}

export default App;
