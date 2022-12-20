import React, { Component } from "react";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Notification from "./Notification/Notification";
import Section from "./Section/Section";
import Statistics from "./Statistics/Statistics";

export default class App extends Component{
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const result = good + neutral + bad;
    return result;
  };

  countPositiveFeedbackPercentage = () => {
    const result = this.countTotalFeedback();
    const { good } = this.state;
    const percentage = (good * 100) / result;
    return Math.round(percentage);
  };

  onLeaveFeedback = (evt) => {
    const name = evt.target.name;
    this.setState((prevState) => ({
      [name]: prevState[name] + 1
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    const objKey = Object.keys(this.state);
    return (
      <>
        <Section title="Please leave your feedback">
          <FeedbackOptions options={objKey} onLeaveFeedback={this.onLeaveFeedback} />
        </Section>

        {total === 0 ? (
          <Notification message="There is no feedback"/>
        ) : (
            <Section title=" Statistics">
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                positivePercentage={positivePercentage}
              />
            </Section>)
      }
      </>
    )
  }
}
