import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { rockAdd, rockGetList } from '../../ducks/rocks/operations';
import { rocksGet } from '../../ducks/rocks/selectors';

const RockForm = ({ rockAdd, rockGetList }, props) => {
  const { id } = useParams();
  const rock = [];
  const formHeader= `Creating rock`;


  useEffect(() => {
    rockGetList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function placeholder(type) {
    if (id !== 'add' && id !== undefined) {
      return rock[type];
    }
  }

  const handleSubmit = (payload) => {
    if (id === 'add' || id === undefined) {
      console.log('POST');
      rockAdd(payload);
    }
  };

  const history = useHistory();

  return (
    <div className="rockForm">
      <h2>{formHeader}</h2>
      <Formik
        initialValues={{
          name: `${placeholder('name') || ''}`,
          color: `${placeholder('color') || ''}`,
        }}
        onSubmit={(payload) => handleSubmit(payload)}
        enableReinitialize={true}
      >
        <Form>
          {`Name: `} <Field name="name" placeholder={placeholder('name')} />
          {`Color: `}
          <Field name="color" placeholder={placeholder('color')} />
          <button type="submit" onClick={() => history.goBack()}>
            {'Submit'}
          </button>
        </Form>
      </Formik>
      <button className="button" onClick={() => history.goBack()}>
        {'Back'}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rocks: rocksGet(state),
  };
};

const mapDispatchToProps = {
  rockAdd,
  rockGetList,
};

export default connect(mapStateToProps, mapDispatchToProps)(RockForm);
