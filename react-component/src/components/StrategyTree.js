/**
 * @file
 * @author Created by geekzwb on 2018/3/23.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StrategyTree.css';

/**
 *
 * @param obj
 * @param path
 * @returns {*}
 */
function getObjPropertyByPath(obj, path) {
  const pathArr = path.split('.');
  let result = obj;
  for (let i = 0; i < pathArr.length; i++) {
    if (typeof result[pathArr[i]] === 'undefined') {
      // console.log(`${Object.keys(obj)} obj has not the path ${path}`);
      result = '';
      break;
    }
    result = result[pathArr[i]];
  }
  return result;
}
let key = 0;
class StrategyTree extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, renderCondition, renderName, renderAddBrotherNode, renderAddChildNode} = this.props;

    /**
     * @param data
     * @param {ruleSetID, parentRuleSetID, pathIndex} ruleSetID
     * @param condition
     * @returns {*}
     **/
    function ren(data, {ruleSetID, parentRuleSetID, pathIndex}, condition) {
      // console.log('ruleSetID', ruleSetID);
      const ruleSetIdObj = getObjPropertyByPath(data, ruleSetID);
      if (!ruleSetIdObj || typeof ruleSetIdObj !== 'object') return '';

      // 走到头了
      if (ruleSetIdObj.text) {
        key += 1;
        return (
          <li key={key}>
            {condition &&
            <div className="tree-has-condition">
              {typeof renderCondition === 'function' ? renderCondition({ruleSetID, parentRuleSetID}, condition) : condition.toString()}
            </div>
            }
            <div className="strategy-text">
              {typeof renderName === 'function' ? renderName({ruleSetID, ruleSetIdObj, parentRuleSetID, pathIndex}) : ruleSetIdObj.text}

              {/*增加兄弟节点和子节点*/}
              <div className="add-brother">
                {typeof renderAddBrotherNode === 'function' ? renderAddBrotherNode(ruleSetID, ruleSetIdObj, parentRuleSetID) : ''}
              </div>
            </div>
          </li>
        );
      }
      const paths = Array.isArray(ruleSetIdObj.paths) ? ruleSetIdObj.paths : [];

      // let hasChild = ruleSetIdObj.paths.length > 1 || !ruleSetIdObj.paths[0].condition.default;
      return (
        <li className='tree-has-child' key={ruleSetID}>
          {
            // is the first ruleSet or has condition
            // data.beginRuleSet !== ruleSetID ?
            condition &&
            <div className="tree-has-condition">
              {typeof renderCondition === 'function' ? renderCondition({ruleSetID, parentRuleSetID}, condition) : condition.toString()}
            </div>
          }
          <div className="strategy-text">
            {typeof renderName === 'function' ? renderName({ruleSetID, ruleSetIdObj, parentRuleSetID, pathIndex}) : ruleSetIdObj['ruleSetName']}

            {/*增加兄弟节点和子节点*/}
            <div className="add-brother">
              {typeof renderAddBrotherNode === 'function' ? renderAddBrotherNode(ruleSetID, ruleSetIdObj, parentRuleSetID) : ''}
            </div>
            <div className="add-child">
              {typeof renderAddChildNode === 'function' ? renderAddChildNode(ruleSetID, ruleSetIdObj, parentRuleSetID) : ''}
            </div>
          </div>
          <ul>
            {paths.map((path, index) => {
              return ren(data, {ruleSetID: path.next, parentRuleSetID: ruleSetID, pathIndex: index}, path.condition);
            })}
          </ul>
        </li>
      );
    }

    const strateTree = (
      <div className="strategy-tree">
        <ul>
          {data.beginRuleSet && ren(data, {ruleSetID: data.beginRuleSet, parentRuleSetID: ''})}
        </ul>
      </div>
    );

    return (
      strateTree
    );
  }
}

//renderCondition(condition){}
//renderName(ruleSetID.ruleSetName || decision1.text){}
StrategyTree.propTypes = {
  data: PropTypes.object.isRequired,
  renderCondition: PropTypes.func,
  renderName: PropTypes.func,
  renderAddBrotherNode: PropTypes.func,
  renderAddChildNode: PropTypes.func,
};

export default StrategyTree;