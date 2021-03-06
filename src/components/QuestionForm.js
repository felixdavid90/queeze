import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { Form, Button, ButtonGroup, ButtonToolbar, Card, InputGroup } from 'react-bootstrap';

const styles = StyleSheet.create({
  deleteBtn: {
    color: '#B93539',
    ':hover': {
      textDecoration: 'none',
    },
  },
});

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.createChoice = this.createChoice.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
  }

  createChoice() {
    if (this.props.data.choices.length >= 10) return;
    this.props.onQuestionCreateChoice(this.props.id);
  }

  deleteChoice(i) {
    if (this.props.data.choices.length <= 2) return;
    this.props.onQuestionDeleteChoice(this.props.id, i);
  }

  renderChoices() {
    const { id } = this.props;
    const qid = `q${id}`;
    const { choices, answer } = this.props.data;
    return (
      <Form.Group ref="choices">
      {
        (choices.map((choice, i) => {
          return (
            <InputGroup key={i} className="mb-1">
              <InputGroup.Prepend>
                <span className="input-group-text">
                  <input
                    type="radio"
                    name={qid}
                    ref={`c${i}_ans`}
                    onChange={(e) => this.props.onQuestionAnswerChange(e, id, i)}
                    checked={answer === i}
                  />
                </span>
              </InputGroup.Prepend>
              <Form.Control
                placeholder={`Choice ${i+1}`}
                ref={`c${i}`}
                onChange={(e) => this.props.onQuestionChoiceChange(e, id, i)}
                value={choices[i]}
              />
              <InputGroup.Append>
                <Button variant="link" className={css(styles.deleteBtn)} onClick={() => this.deleteChoice(i)}>✖︎</Button>
              </InputGroup.Append>
            </InputGroup>
          );
        }))
      }
      </Form.Group>
    );
  }

  render() {
    const { id, questionNum } = this.props;
    const qid = `q${id}`;
    const { text } = this.props.data;
    return (
      <Card className="mb-4">
        <Form.Group className="mb-0">
          <Card.Header>Question {questionNum}</Card.Header>
          <Card.Body>
            <Card.Text>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="What is your question?"
                ref="text"
                onChange={(e) => this.props.onQuestionTextChange(e, id)}
                value={text}
              />
            </Card.Text>

            { this.renderChoices() }
            
            <ButtonToolbar className="justify-content-between">
              <Button variant="outline-success" onClick={() => this.createChoice()}>✚ New Choice</Button>
              <Button variant="danger" onClick={() => this.props.delete(id)}>✖︎ Delete Question</Button>
            </ButtonToolbar>
          </Card.Body>
        </Form.Group>
      </Card>
    );
  }
}

export default QuestionForm;