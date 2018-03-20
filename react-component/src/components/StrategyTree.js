/**
 * Created by geekzwb on 2018/3/19.
 * What for:
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
      result = '';
      break;
    }
    result = result[pathArr[i]];
  }
  return result;
}

class StrategyTree extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data} = this.props;

    function ren(data, ruleSetID) {
      // console.log('ruleSetID', ruleSetID);
      const ruleSetIdMap = getObjPropertyByPath(data, ruleSetID);
      if (!ruleSetIdMap || typeof ruleSetIdMap !== 'object') return '';
      if (ruleSetIdMap.text) return (
        <li>
          <div className="tree-has-condition">
            score &lt; 50
          </div>
          <div className="strategy-text">{ruleSetIdMap.text}</div>
        </li>
      );
      const paths = Array.isArray(ruleSetIdMap.paths) ? ruleSetIdMap.paths : [];
      // if(ruleSetIdMap.paths.length < 1) return;
      /*let liChildren = paths.map((path, index) => {
        console.log('path', path);
        if(path.condition && path.condition.default) {
          return <li>
            {/!*<div className="tree-has-condition">
              score &lt; 50
            </div>
            <div className="strategy-text">
              {path.condition.next}
            </div>*!/}
          </li>
        } else {
          return <li className="tree-has-child">
            <div className="tree-has-condition">
              score &lt; 50
            </div>
            <div className="strategy-text">
              {getObjPropertyByPath(data, path.next)['ruleSetName']}
            </div>
            {ren(data, path.next)}
          </li>
        }
      });*/

      let hasChild = ruleSetIdMap.paths.length > 1 || !ruleSetIdMap.paths[0].condition.default;
      return (
        <li className='tree-has-child'>
          <div className="tree-has-condition">
            score &lt; 50
          </div>
          <div className="strategy-text">
            {ruleSetIdMap['ruleSetName']}
          </div>
          <ul>
            {paths.map((path, index) => {
              console.log('path', path);
              console.log('path.next', path.next);
              return ren(data, path.next);
            })}
          </ul>
        </li>
      );
    }

    const strateTree = (
      <div className="strategy-tree">
        <ul>
          {ren(data, data.beginRuleSet)}
        </ul>
      </div>
    );

    return (
      <div>
        {strateTree}
        <div className="strategy-tree">
          <ul>
            <li className="tree-has-child">
              <div className="strategy-text">规则集01</div>
              <ul>
                <li className="tree-has-child">
                  <div className="tree-has-condition">
                    score &lt; 50
                  </div>
                  <div className="strategy-text">
                    规则集02
                  </div>
                  <ul>
                    <li className="tree-has-child">
                      <div className="tree-has-condition">
                        score &lt; 50
                      </div>
                      <div className="strategy-text">规则集02-1</div>
                      <ul>
                        <li>
                          <div className="tree-has-condition">
                            score &lt; 50
                          </div>
                          <div className="strategy-text">规则集02-1</div>
                        </li>
                        <li>
                          <div className="tree-has-condition">
                            score &lt; 50
                          </div>
                          <div className="strategy-text">规则集02-2</div>
                        </li>
                        <li>
                          <div className="tree-has-condition">
                            score &lt; 50
                          </div>
                          <div className="strategy-text">规则集02-3</div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="tree-has-condition">
                        score &lt; 50
                      </div>
                      <div className="strategy-text">规则集02-2</div>
                    </li>
                    <li>
                      <div className="tree-has-condition">
                        score &lt; 50
                      </div>
                      <div className="strategy-text">规则集02-3</div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="tree-has-condition">
                    score &lt; 50
                  </div>
                  <div className="strategy-text">规则集04</div>
                </li>
                <li>
                  <div className="tree-has-condition">
                    score &lt; 50
                  </div>
                  <div className="strategy-text">欺诈</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

StrategyTree.propTypes = {
  data: PropTypes.object.isRequired,
};

export default StrategyTree;