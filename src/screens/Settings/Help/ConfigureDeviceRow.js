/* @flow */
import React, { PureComponent } from "react";
import { Trans } from "react-i18next";
import SettingsRow from "../../../components/SettingsRow";
import { withOnboardingContext } from "../../Onboarding/onboardingContext";
import type { OnboardingStepProps } from "../../Onboarding/types";

class ConfigureDeviceRow extends PureComponent<OnboardingStepProps> {
  onPress = async () => {
    this.props.setShowWelcome(false);
    this.props.setFirstTimeOnboarding(false);
    this.props.navigation.navigate("OnboardingStepChooseDevice", {
      goingBackToScreen: "HelpSettings",
    });
  };

  render() {
    return (
      <SettingsRow
        event="ConfigureDeviceRow"
        title={<Trans i18nKey="settings.help.configureDevice" />}
        desc={<Trans i18nKey="settings.help.configureDeviceDesc" />}
        arrowRight
        onPress={this.onPress}
        alignedTop
      />
    );
  }
}

export default withOnboardingContext(ConfigureDeviceRow);
