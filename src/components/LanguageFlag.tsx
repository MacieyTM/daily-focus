import { useState } from "react";
import { Image, StyleSheet, Text } from "react-native";

import { fontSize } from "../constants/theme";

type LanguageFlagProps = {
	countryCode: "gb" | "pl";
	fallback: "EN" | "PL";
	fallbackColor: string;
};

export default function LanguageFlag({ countryCode, fallback, fallbackColor }: LanguageFlagProps) {
	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return (
			<Text
				style={[
					styles.flagFallback,
					{
						color: fallbackColor,
					},
				]}
			>
				{fallback}
			</Text>
		);
	}

	return (
		<Image
			source={{
				uri: `https://flagcdn.com/w40/${countryCode}.png`,
			}}
			style={styles.flag}
			onError={() => setHasError(true)}
		/>
	);
}

const styles = StyleSheet.create({
	flag: {
		width: 32,
		height: 22,
		resizeMode: "contain",
	},

	flagFallback: {
		width: 32,
		fontSize: fontSize.md,
		fontWeight: "600",
		textAlign: "center",
	},
});
