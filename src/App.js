import "./App.css";

import React, { useState, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

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

	// const loadingPercentage = Math.round(loadingProgression * 100);

	// const [devicePixelRatio, setDevicePixelRatio] = useState(
	// 	window.devicePixelRatio,
	// );

	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [marginLeft, setMarginLeft] = useState(0);
	const [marginTop, setMarginTop] = useState(0);

	// const handleChangePixelRatio = useCallback(
	// 	function () {
	// 		// A function which will update the device pixel ratio of the Unity
	// 		// Application to match the device pixel ratio of the browser.
	// 		const updateDevicePixelRatio = function () {
	// 			setDevicePixelRatio(window.devicePixelRatio);
	// 		};
	// 		// A media matcher which watches for changes in the device pixel ratio.
	// 		const mediaMatcher = window.matchMedia(
	// 			`screen and (resolution: ${devicePixelRatio}dppx)`,
	// 		);
	// 		// Adding an event listener to the media matcher which will update the
	// 		// device pixel ratio of the Unity Application when the device pixel
	// 		// ratio changes.
	// 		mediaMatcher.addEventListener("change", updateDevicePixelRatio);
	// 		return function () {
	// 			// Removing the event listener when the component unmounts.
	// 			mediaMatcher.removeEventListener(
	// 				"change",
	// 				updateDevicePixelRatio,
	// 			);
	// 		};
	// 	},
	// 	[devicePixelRatio],
	// );

	useEffect(() => {
		requestFullscreen(true);

		window.addEventListener("resize", () => {
			setInnerWidth(window.innerWidth);
			setInnerHeight(window.innerHeight);
		});
	}, []);

	useEffect(() => {
		if (innerHeight / innerWidth < 9.0 / 16.0) {
			setHeight(innerHeight);
			setWidth(innerHeight * (16.0 / 9.0));
			setMarginLeft((innerWidth - innerHeight * (16.0 / 9.0)) / 2.0);
			setMarginTop(0);
		} else if (innerHeight / innerWidth > 9.0 / 16.0) {
			setWidth(innerWidth);
			setHeight(innerWidth * (9.0 / 16.0));
			setMarginTop((innerHeight - innerWidth * (9.0 / 16.0)) / 2.0);
			setMarginLeft(0);
		} else {
			setWidth(innerWidth);
			setHeight(innerHeight);
			setMarginLeft(0);
			setMarginTop(0);
		}
	}, [innerWidth, innerHeight]);

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
			{/* <button
				onClick={() => {
					console.log(window.screen.orientation);

					const oppositeOrientation =
						window.screen.orientation.type.startsWith("portrait")
							? "landscape"
							: "portrait";
					window.screen.orientation
						.lock(oppositeOrientation)
						.then(() => {
							console.log(`Locked to ${oppositeOrientation}\n`);
						})
						.catch((error) => {
							console.error(`${error}\n`);
						});
				}}
			>
				회전
			</button> */}
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
