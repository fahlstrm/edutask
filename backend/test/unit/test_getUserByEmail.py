import pytest
import unittest.mock as mock

from src.controllers.usercontroller import UserController
from src.util.dao import DAO


def test_noAt_ValueError():
    mockeddao = mock.MagicMock() # mock the dependency
    mockeddao.find.return_value = [{'email': 'frah20@student.bth.se'}, {'email': 'frah20@student.bth.se'}] # define the behavior
    mockedsut = UserController(dao=mockeddao) # inject the dependency and instantiate an object of class UserController

    with pytest.raises(ValueError):
        test_email = "frah20student.bth.se" # no @
        validationresult = mockedsut.get_user_by_email(test_email)

def test_singleMatchFound_true():
    mockeddao = mock.MagicMock() # mock the dependency
    mockeddao.find.return_value = [{'email': 'joki20@student.bth.se'}] # define the behavior
    mockedsut = UserController(dao=mockeddao) # inject the dependency and instantiate an object of class UserController


    test_email = "joki20@student.bth.se"
    validationresult = mockedsut.get_user_by_email(test_email)
    assert validationresult == { "email": test_email }

def test_severalMatchFound_true():
    
    mockeddao = mock.MagicMock() # mock the dependency
    mockeddao.find.return_value = [{'email': 'joki20@student.bth.se'}, {'email': 'joki20@student.bth.se'}] # define the behavior
    mockedsut = UserController(dao=mockeddao) # inject the dependency and instantiate an object of class UserController

    test_email = "joki20@student.bth.se"
    validationresult = mockedsut.get_user_by_email(test_email)
    assert validationresult == { "email": test_email }

def test_Exception_true():
    mockeddao = mock.MagicMock() # mock the dependency
    mockedsut = UserController({}) # inject the dependency and instantiate an object of class UserController

    with pytest.raises(Exception):
        test_email = "frah20@student.bth.se" # no @
        validationresult = mockedsut.get_user_by_email(test_email)