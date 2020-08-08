import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	renderError({ error, touched, active }) {
		if (touched && error && !active) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched && !meta.active ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};
	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};
	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter name" />
				<Field name="description" component={this.renderInput} label="Enter Description" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}
const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'You must enter a name';
	}
	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}
	return errors;
};
export default reduxForm({ form: 'streamForm', validate })(StreamForm);
