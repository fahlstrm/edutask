import pytest
import unittest.mock as mock
from unittest.mock import patch

from src.util.daos import getDao
from src.controllers.usercontroller import UserController
from src.util.validators import getValidator
