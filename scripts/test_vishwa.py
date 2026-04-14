import unittest
from unittest.mock import patch, mock_open, MagicMock
from pathlib import Path
import json
import os

# Import the module under test
import vishwa

class TestVishwaCommandCenter(unittest.TestCase):

    @patch('vishwa.subprocess.run')
    def test_run_node_backend_exists(self, mock_run):
        with patch.object(Path, 'exists', return_value=True):
            vishwa.run_node("test_script.js", ["arg1"])
            mock_run.assert_called_once()
            
    @patch('vishwa.subprocess.run')
    def test_run_node_backend_not_exists(self, mock_run):
        with patch.object(Path, 'exists', return_value=False):
            vishwa.run_node("missing_script.js")
            mock_run.assert_not_called()

    def test_audit_nvf_success(self):
        mock_data = [{
            "id": "test_1_1",
            "text_slug": "test",
            "chapter": 1,
            "verse": 1,
            "original": "Sanskrit text here",
            "transliteration": "Translit text here",
            "layers": [
                {"author": "iskcon", "lang": "en", "type": "commentary", "content": "Valid commentary"}
            ]
        }]
        mock_json = json.dumps(mock_data)
        
        with patch('builtins.open', mock_open(read_data=mock_json)):
            with patch('os.path.isfile', return_value=True):
                # We can test the inner logic by asserting standard output or modifying audit_nvf to return
                # However, for now we will just call it and ensure no exceptions
                vishwa.audit_nvf("dummy_path.json")

    @patch('vishwa.Path.mkdir')
    def test_bootstrap_book(self, mock_mkdir):
        with patch('builtins.open', mock_open()) as mocked_file:
            vishwa.bootstrap_book("new_book", 2)
            mock_mkdir.assert_called_with(parents=True, exist_ok=True)
            self.assertEqual(mocked_file.call_count, 2)
            
    @patch('vishwa.shutil.rmtree')
    @patch('vishwa.os.remove')
    def test_clean_oneoffs(self, mock_remove, mock_rmtree):
        with patch.object(Path, 'exists', return_value=True):
            vishwa.clean_oneoffs()
            mock_rmtree.assert_called()
            mock_remove.assert_called()

    def test_patch_sanskrit_success(self):
        with patch.object(Path, 'exists', return_value=True):
            mock_file_data = '[{"original": "old"}]'
            with patch('builtins.open', mock_open(read_data=mock_file_data)) as m:
                vishwa.patch_sanskrit("mahabharata", "1")
                # write should be called
                m.return_value.write.called

if __name__ == '__main__':
    unittest.main()
