var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var FormData = require('react-form-data');
var assign = Object.assign || require('object-assign');

var EditEmployee = React.createClass({
  mixins: [ FormData ],

  getInitialState: function(){
    return {
    };
  },

  render: function() {

    return <Modal title='Редагувати співробітника'
          bsStyle='primary'
          onRequestHide={this.props.onRequestHide}
          animation={true}>
          <div className='modal-body'>
            <form onChange={this.updateFormData}>

              <Input name='fullName' type='text' label='Ім`я' placeholder='Введіть Ім`я' defaultValue={this.props.fullName} />

            </form>
          </div>
          <div className='modal-footer'>
            <Button onClick={this.props.onRequestHide}>Відмінити</Button>
            <Button bsStyle='primary' onClick={this._handleSubmit}>Записати</Button>
          </div>
        </Modal>;
  },

  _handleSubmit: function(e) {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.formData);
    }
    this.props.onRequestHide();
  }
});

exports.EditEmployee = EditEmployee;
