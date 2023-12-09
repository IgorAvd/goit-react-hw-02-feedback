import React, { Component } from 'react';
import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = option => {
    this.setState({ [option]: this.state[option] + 1 });
  };

  countTotalFeedback = () => {
    const total = this.state.good + this.state.bad + this.state.neutral;
    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    const { good } = this.state;
    const positivePercentage = total > 0 ? Math.round((good / total) * 100) : 0;
    return positivePercentage;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const feedbackOptions = Object.keys(this.state);
    return (
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedbackOptions}
          onLeaveFeedback={this.onLeaveFeedback}
          state={this.state}
        />
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={this.countTotalFeedback()}
          positivePercentage={this.countPositiveFeedbackPercentage()}
        />
        <Notification
          message="There is no feedback"
          total={this.countTotalFeedback()}
        />
      </Section>
    );
  }
}
