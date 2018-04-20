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
                  'score': {'gt': 0, 'lt': 50}
                },
                'next': 'ruleSet.ruleSetID2'
              },
              {
                'condition': {
                  'score': {'gt': 50, 'lt': 80}
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
                  'score': {'gt': 0, 'lt': 50}
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
                  'score': {'gt': 0, 'lt': 50}
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
    this.renderName = this.renderName.bind(this);
    this.translateToText = this.translateToText.bind(this);
    this.renderCondition = this.renderCondition.bind(this);
  }

  renderName(name) {
    return <div>
      {name}
    </div>;
  }

  /**
   * translate {lt: 88, gte: 66} to  '66 ≤ score < 88'
   * @param score
   * @returns {string}
   */
  translateToText(score) {
    if(!score || typeof score !== 'object') return '';
    let scoreText = 'score';
    // 大于， 大于等于的逻辑处理
    if (typeof score.gt !== 'undefined' && typeof score.gte !== 'undefined') {
      if (score.gt - 1 > score.gte) {
        scoreText = `${score.gt} < ${scoreText}`;
      } else {
        scoreText = `${score.gte} ≤ ${scoreText}`;
      }
    } else if (typeof score.gt !== 'undefined') {
      scoreText = `${score.gt} < ${scoreText}`;
    } else if (typeof score.gte !== 'undefined') {
      scoreText = `${score.gte} ≤ ${scoreText}`;
    }

    // 小于， 小于等于的逻辑处理
    if (typeof score.lt !== 'undefined' && typeof score.lte !== 'undefined') {
      if (score.lt - 1 <= score.lte) {
        scoreText = `${scoreText} < ${score.lt}`;
      } else {
        scoreText = `${scoreText} ≤ ${score.lte}`;
      }
    } else if (typeof score.lt !== 'undefined') {
      scoreText = `${scoreText} < ${score.lt}`;
    } else if (typeof score.lte !== 'undefined') {
      scoreText = `${scoreText} ≤ ${score.lte}`;
    }

    // 等于
    if (score !== 'score') scoreText += ' &&';
    if (score.eq) scoreText += ` = ${score.eq}`;

    // 不等于
    if (scoreText.includes('=')) scoreText += ' &&';
    if (score.neq) scoreText += ` ≠ ${score.neq}`;

    // 去除末尾多余的 &&
    if (scoreText[scoreText.length - 1] === '&') scoreText = scoreText.slice(0, -2);

    // score 为空
    if (scoreText === 'score') scoreText = '';

    return scoreText;
  }

  renderCondition(condition) {
    return this.translateToText(condition);
  }

  render() {
    return (
      <StrategyTree
        data={this.state.strategies}
        renderName={this.renderName}
        renderCondition={this.renderCondition}
      />
    )
  }
}

StrategyTreeEX.propTypes = {};

export default StrategyTreeEX;