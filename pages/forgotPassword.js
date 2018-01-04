import React from 'react';

import { validateFormData } from 'utils/validations';

import {
  createRequestOptions,
  submitFormData
} from 'utils/helperFuncs';
import request from 'utils/request';

import ForgotPassword from 'components/views/Auth/ForgotPassword';
// console.log(validateFormData)
class ForgotPasswordPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formDetails: {
        email: {
          status: true,
          errorText: '',
          value: '',
          rules: ['isRequired', 'isEmail'],
        },
      },
    }
  }

  updateFormDetails = (formDetails) => {
    this.setState({ formDetails });
  }

  validateForm = (formData) => {
    return validateFormData(formData);
  }

  submitForm = (formDetails) => { // eslint-disable-line no-unused-vars
    const userData = submitFormData(formDetails);
		this.onForgotPassword(userData);
  }

	componentWillReceiveProps(newProps) {
		// const { loginUserStatus } = newProps;
		// if (loginUserStatus.get('loggedIn')) {
		// 	this.props.onReplaceRoute("/")
		// }
	}

  onForgotPassword = async (data) => {
    this.setState({ error: false });
    const requestBody = { data };
    const requestURL = '/api/forgot-password';
    const options = createRequestOptions('POST', requestBody);
    const response = await request(requestURL, options);
    if(!response.err) {
      const user = response.data;
    } else {
      this.setState({ error: response.err.reason });
    }
}

	render() {
    const { formDetails } = this.state;
		const error = false;
		return (
        <ForgotPassword 
          formDetails={formDetails}
          error={error}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
		);
	}
}

export default ForgotPasswordPage;
