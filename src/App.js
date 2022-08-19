import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { Storage } from "aws-amplify";

function App() {
	const { unityProvider, isLoaded, loadingProgression, requestFullscreen } =
		useUnityContext({
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

	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [marginLeft, setMarginLeft] = useState(0);
	const [marginTop, setMarginTop] = useState(0);

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
		if (window.matchMedia("(orientation: portrait)").matches) {
			setWidth(window.innerWidth * (16 / 9.0));
			setHeight(window.innerWidth);
		} else {
			if (window.innerHeight * (16 / 9.0) <= window.innerWidth) {
				setWidth(window.innerHeight * (16 / 9.0));
				setHeight(window.innerHeight);
				setMarginLeft(
					(window.innerWidth - window.innerHeight * (16 / 9.0)) / 2.0,
				);
			} else {
				setWidth(window.innerWidth);
				setHeight(window.innerWidth * (9 / 16.0));
				setMarginTop(
					(window.innerHeight - window.innerWidth * (9 / 16.0)) / 2.0,
				);
			}
		}

		window.addEventListener("resize", () => {
			if (window.matchMedia("(orientation: portrait)").matches) {
				setWidth(window.innerWidth * (16 / 9.0));
				setHeight(window.innerWidth);
			} else {
				if (window.innerHeight * (16 / 9.0) <= window.innerWidth) {
					setWidth(window.innerHeight * (16 / 9.0));
					setHeight(window.innerHeight);
					setMarginLeft(
						(window.innerWidth - window.innerHeight * (16 / 9.0)) /
							2.0,
					);
				} else {
					setWidth(window.innerWidth);
					setHeight(window.innerWidth * (9 / 16.0));
					setMarginTop(
						(window.innerHeight - window.innerWidth * (9 / 16.0)) /
							2.0,
					);
				}
			}
		});
	}, []);

	return (
		<div
			style={{
				width: width,
				height: height,
				overflow: "hidden",
				marginTop: marginTop,
				marginLeft: marginLeft,
			}}
		>
			<Unity
				className={"unity_app"}
				unityProvider={unityProvider}
				style={{
					width: width,
					height: height,
				}}
				// devicePixelRatio={devicePixelRatio}
			/>
		</div>
	);
}

export default App;
