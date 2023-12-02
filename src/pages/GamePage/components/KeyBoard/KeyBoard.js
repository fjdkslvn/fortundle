import React from "react";
import styles from "./KeyBoard.module.css";
import Key from "./Key";
import { keyBoardInfo } from "../../../../constants/Game";

const KeyBoard = ({ writeWord, keyCheck }) => {
  return (
    <div className={styles.keyboardArea}>
      {keyBoardInfo.map((keyList, idx) => (
        <div className={styles.keyboardList} key={idx}>
          {keyList.map((keyInfo, idx) => (
            <Key
              writeWord={writeWord}
              key={keyInfo.keyCode}
              keyInfo={keyInfo}
              state={keyCheck[keyInfo.hangle]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyBoard;
