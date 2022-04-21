import pytest
import unittest.mock as mock
from unittest.mock import patch, MagicMock

# Different SUT
from src.util.daos import getDao
from src.util.dao import DAO

@pytest.fixture
@patch('src/util/DAO', autospec=True)
def sut():
    mockedDAO.return_value = None