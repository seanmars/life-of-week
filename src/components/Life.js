import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { eachWeekOfInterval, getISOWeek, getYear, differenceInCalendarISOWeeks } from 'date-fns';
import _ from 'lodash';

import { LifeRow } from './LifeRow';
import { Square } from './Square';
import { LifeState } from '../common/LifeState';


const Life = (props) => {
  const { lifeExpectancyYear, birthYear, birthMonth, birthDate, perRowWeeks } = props;
  const endYear = birthYear + lifeExpectancyYear;
  const nowDate = new Date();
  const [data, setData] = useState([]);

  /**
   * @return {Date[]}
   */
  const getWeeks = () => {
    return new eachWeekOfInterval({
      start: new Date(birthYear, birthMonth, birthDate),
      end: new Date(endYear, birthMonth, birthDate)
    });
  };

  /**
   * @return {Date[][]}
   */
  const getEachRowWeeks = () => {
    const weeks = getWeeks();
    return _.chunk(weeks, perRowWeeks).reverse();
  };

  /**
   *
   * @param {Date} now
   * @param {Date} target
   * @return {number}
   */
  const stateOfYearWeek = (now, target) => {
    const nowYear = getYear(now);
    const targetYear = getYear(target);

    if (nowYear > targetYear) {
      return LifeState.past;
    }

    if (nowYear < targetYear) {
      return LifeState.future;
    }

    const result = differenceInCalendarISOWeeks(now, target);
    if (result === 0) {
      return LifeState.current;
    } else if (result > 0) {
      return LifeState.past;
    } else if (result < 0) {
      return LifeState.future;
    }

    return LifeState.none;
  };

  useEffect(() => {
    setData(getEachRowWeeks());
  }, [lifeExpectancyYear, birthYear, perRowWeeks]);

  return (<>
    {data && data.map((row, index) => {
      return (<LifeRow key={index}>
        {row.map(d => {
          const state = stateOfYearWeek(nowDate, d);
          return (<Square key={d} state={state} />);
        })}
      </LifeRow>);
    })}
  </>);
};

Life.propTypes = {
  lifeExpectancyYear: PropTypes.number,
  birthYear: PropTypes.number,
  birthMonth: PropTypes.number,
  birthDate: PropTypes.number,
  perRowWeeks: PropTypes.number,
};

Life.defaultProps = {
  lifeExpectancyYear: 70,
  birthMonth: 1,
  birthDate: 1,
  perRowWeeks: 52,
};

export { Life };