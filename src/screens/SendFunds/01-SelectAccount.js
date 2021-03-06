/* @flow */
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
// $FlowFixMe
import { SafeAreaView, FlatList } from "react-navigation";
import type { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import i18next from "i18next";
import { translate, Trans } from "react-i18next";
import type { Account } from "@ledgerhq/live-common/lib/types";

import { isAccountEmpty } from "@ledgerhq/live-common/lib/account";
import { accountsSelector } from "../../reducers/accounts";
import colors from "../../colors";
import { TrackScreen } from "../../analytics";
import LText from "../../components/LText";
import FilteredSearchBar from "../../components/FilteredSearchBar";
import AccountCard from "../../components/AccountCard";
import StepHeader from "../../components/StepHeader";
import KeyboardView from "../../components/KeyboardView";

const SEARCH_KEYS = ["name", "unit.code"];

type Props = {
  accounts: Account[],
  navigation: NavigationScreenProp<{
    params: {},
  }>,
};

type State = {};

class SendFundsSelectAccount extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: (
      <StepHeader
        title={i18next.t("send.stepperHeader.selectAccount")}
        subtitle={i18next.t("send.stepperHeader.stepRange", {
          currentStep: "1",
          totalSteps: "6",
        })}
      />
    ),
  };

  renderList = items => (
    <FlatList
      data={items}
      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.list}
    />
  );

  renderItem = ({ item }: { item: Account }) => (
    <AccountCard
      account={item}
      style={styles.cardStyle}
      onPress={() => {
        this.props.navigation.navigate("SendSelectRecipient", {
          accountId: item.id,
        });
      }}
    />
  );

  renderEmptySearch = () => (
    <View style={styles.emptyResults}>
      <LText style={styles.emptyText}>
        <Trans i18nKey="transfer.receive.noAccount" />
      </LText>
    </View>
  );

  keyExtractor = item => item.id;

  render() {
    const { accounts } = this.props;
    return (
      <SafeAreaView style={styles.root}>
        <TrackScreen category="SendFunds" name="SelectAccount" />
        <KeyboardView style={{ flex: 1 }}>
          <View style={styles.searchContainer}>
            <FilteredSearchBar
              list={accounts.filter(account => !isAccountEmpty(account))}
              inputWrapperStyle={styles.padding}
              renderList={this.renderList}
              renderEmptySearch={this.renderEmptySearch}
              keys={SEARCH_KEYS}
            />
          </View>
        </KeyboardView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  accounts: accountsSelector(state),
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    paddingTop: 16,
    flex: 1,
  },
  list: {
    paddingBottom: 32,
  },
  emptyResults: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.fog,
  },
  padding: {
    paddingHorizontal: 16,
  },
  cardStyle: {
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
});

export default translate()(connect(mapStateToProps)(SendFundsSelectAccount));
