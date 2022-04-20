import pytest
import unittest.mock as mock
from unittest.mock import patch, MagicMock

# Different SUT
from src.util.daos import getDao
from src.util.validators import getValidator
from src.util.dao import DAO

class TestNamespaces:
    @pytest.mark.namespaces
    def test_1(self):
        # TODO: patch the DAO in the getDAO method within the daos module
        with patch('?') as mockedDAO:
            mock = MagicMock()
            mockedDAO.return_value = mock
            assert getDao(collection_name='test') == mock
