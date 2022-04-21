import pytest
import unittest.mock as mock
import json, os
from unittest.mock import patch, MagicMock
from src.util.validators import getValidator

# Different SUT
from src.util.daos import getDao
from src.util.dao import DAO



class TestDatabase:
    """This test demonstrates the use of yield as an alternative to return, which allows to write code *after* the statement
    which will be executed once all tests have run. This can be used for cleanup."""

    @pytest.fixture
    def sut(self):
        fabricatedFileName = './src/static/validators/test.json'
        self.json_string = {
                "$jsonSchema": {
                    "bsonType": "object",
                    "required": ["url"],
                    "properties": {
                        "url": {
                            "bsonType": "string",
                            "description": "the url of a YouTube video must be determined"
                        }
                    }
                }
            }
        with open(fabricatedFileName, 'w') as outfile:
            json.dump(self.json_string, outfile)
        
        # yield instead of return the system under test
        # yield getValidator('task')

        # clean up the file after all tests have run
        os.remove(fabricatedFileName)


    @pytest.mark.demo
    def test_create(self, sut):
        test = DAO(collection_name="test")
        content = test.create({"url": "hej"})
        # assert content['Name'] == self.json_string['Name']

    