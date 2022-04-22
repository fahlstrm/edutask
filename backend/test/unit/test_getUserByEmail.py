# import pytest
# import unittest.mock as mock

# from src.controllers.usercontroller import UserController
# from src.util.dao import DAO


# def test_noAt_ValueError():
#     """ Test that ValueError raised when email dont validate """
#     mockeddao = mock.MagicMock() # mock the dependency
#     mockedsut = UserController(dao=mockeddao) # inject the dependency and instantiate an object of class UserController

#     with pytest.raises(ValueError):
#         test_email = "jane.doe.testmail.com" # no @
#         mockedsut.get_user_by_email(test_email)


# def test_noMatchFound_true():
#     """ Test that None is returned if no user is associated to email input address """
#     mockeddao = mock.MagicMock() # mock the dependency
#     mockeddao.find.return_value = [] # define the behavior
#     mockedsut = UserController(dao=mockeddao) # inject the dependency and instantiate an object of class UserController

#     test_email = "jane.doe@testmail.com"
#     validationresult = mockedsut.get_user_by_email(test_email)
#     assert validationresult == None


# def test_singleMatchFound_true():
#     """ Test that email is returned when match """
#     mockeddao = mock.MagicMock() # mock the dependency
#     mockeddao.find.return_value = [{'email': 'jane.doe@testmail.com'}] # define the behavior
#     mockedsut = UserController(dao=mockeddao) # inject the dependency and instantiate an object of class UserController

#     test_email = "jane.doe@testmail.com"
#     validationresult = mockedsut.get_user_by_email(test_email)
#     assert validationresult == { "email": test_email }


# def test_severalMatchFound_true():
#     """ Test that only 1st is returned when several email matches """
#     mockeddao = mock.MagicMock() # mock the dependency
#     mockeddao.find.return_value = [{'email': 'jane.doe@testmail.com', 'name': 'Jane'}, {'email': 'jane.doe@testmail.com', 'name': 'Foo'}] # define the behavior
#     mockedsut = UserController(dao=mockeddao) # inject the dependency and instantiate an object of class UserController

#     test_email = "jane.doe@testmail.com"
#     validationresult = mockedsut.get_user_by_email(test_email)
#     assert validationresult == {'email': 'jane.doe@testmail.com', 'name': 'Jane'}


# # def test_Exception_true():
# #     """ Test that exception is rasised """
# #     mockedsut = UserController({}) # inject the dependency and instantiate an object of class UserController

# #     with pytest.raises(Exception):
# #         test_email = "jane.doe@testmail.com" # no @
# #         mockedsut.get_user_by_email(test_email)