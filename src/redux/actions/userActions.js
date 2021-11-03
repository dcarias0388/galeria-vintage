import { ActionTypes } from "./actionTypes";
import { userService } from "./../../_services/userService";
import { alertActions } from "./alertActions";
import { history } from "./../../_helpers/history";
import { authenticationService } from "./../../_services/authenticationService";

export const userActions = {
  login,
  logout,
  register,
  updateUser,
  getAll,
  delete: _delete,
};

function login(username, password, from) {
  return (dispatch) => {
    dispatch(request({ username }));

    authenticationService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push(from);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: ActionTypes.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: ActionTypes.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: ActionTypes.LOGIN_FAILURE, error };
  }
}

function logout() {
  authenticationService.logout();
  return { type: ActionTypes.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        dispatch(alertActions.success("Registrada Satisfactoriamente."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: ActionTypes.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: ActionTypes.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: ActionTypes.REGISTER_FAILURE, error };
  }
}

function updateUser(newUser) {
  return (dispatch) => {
    dispatch(request(newUser));

    userService.update(newUser).then(
      (newUser) => {
        dispatch(success(newUser));
        dispatch(
          alertActions.success("Usuario actualizado satisfactoriamente.")
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(newUser) {
    return { type: ActionTypes.UPDATE_REQUEST, newUser };
  }
  function success(newUser) {
    return { type: ActionTypes.UPDATE_SUCCESS, newUser };
  }
  function failure(newUser, error) {
    return { type: ActionTypes.UPDATE_FAILURE, newUser, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: ActionTypes.GETALL_REQUEST };
  }
  function success(users) {
    return { type: ActionTypes.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: ActionTypes.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => {
        dispatch(success(id));
        dispatch(alertActions.success("Usuario eliminado satisfactoriamente."));
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: ActionTypes.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: ActionTypes.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: ActionTypes.DELETE_FAILURE, id, error };
  }
}
