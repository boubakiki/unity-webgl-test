import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { Storage } from "aws-amplify";

function App() {
	const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
		loaderUrl:
			"https://unitywebglfile164239-dev.s3.ap-northeast-2.amazonaws.com/public/Mong_0802.loader.js",
		dataUrl:
			"https://unitywebglfile164239-dev.s3.ap-northeast-2.amazonaws.com/public/Mong_0802.data",
		frameworkUrl:
			"https://unitywebglfile164239-dev.s3.ap-northeast-2.amazonaws.com/public/Mong_0802.framework.js",
		codeUrl:
			"https://unitywebglfile164239-dev.s3.ap-northeast-2.amazonaws.com/public/Mong_0802.wasm",
	});

	const loadingPercentage = Math.round(loadingProgression * 100);

	const [devicePixelRatio, setDevicePixelRatio] = useState(
		window.devicePixelRatio,
	);

	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);

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

	useEffect(() => {
		window.addEventListener("resize", () => {
			setInnerWidth(window.innerWidth);
			setInnerHeight(window.innerHeight);
		});
	}, []);

	return (
		<Unity
			unityProvider={unityProvider}
			// style={{ width: innerWidth, height: innerHeight }}
			style={{ width: 1920, height: 1080 }}
			// devicePixelRatio={devicePixelRatio}
		/>
	);
}

export default App;
