/**
 * Created by geekzwb on 2018/3/19.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StrategyTree from '../components/StrategyTree';

class StrategyTreeEX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strategies: {
        'strategyName': '策略名 1',
        'strategyID': 'bvcd37-24542sf34-2d67k442',
        'eventType': 'TRANS',
        'beginRuleSet': 'ruleSet.ruleSetID1',
        'ruleSet': {
          'ruleSetID1': {
            'ruleSetName': '规则集_1',
            'ruleList': [],
            'paths': [
              {
                'condition': {
                  'score': {'moreThen': 0, 'lessThen': 50}
                },
                'next': 'ruleSet.ruleSetID2'
              },
              {
                'condition': {
                  'score': {'moreThen': 50, 'lessThen': 80}
                },
                'next': 'ruleSet.ruleSetID4'
              },
              {"condition": {"default": true}, "next": "decision.decision2"}
            ]
          },
          'ruleSetID2': {
            'ruleSetName': '规则集_2',
            'ruleList': [],
            'paths': [
              {
                'condition': {
                  'score': {'moreThen': 0, 'lessThen': 50}
                },
                'next': 'ruleSet.ruleSetID3'
              },
            ]
          },
          'ruleSetID3': {
            'ruleSetName': '规则集_3',
            'ruleList': [],
            'paths': [
              {
                'condition': {
                  'score': {'moreThen': 0, 'lessThen': 50}
                },
                'next': 'ruleSet.ruleSetID4'
              },
            ]
          },
          'ruleSetID4': {
            'ruleSetName': '规则集_4',
            'ruleList': [],
            'paths': [
              {
                "condition": {"default": true},
                "next": "decision.decision1"
              }
            ]
          },
        },
        'decision': {
          'decision1': {'text': 'pass'},
          'decision2': {'text': 'denied'}
        }
      }
    };
  }

  render() {
    return (
      <StrategyTree
        data={this.state.strategies}
      />
    )
  }
}

StrategyTreeEX.propTypes = {};

export default StrategyTreeEX;