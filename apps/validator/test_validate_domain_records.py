# To run this install the follow packages
# pip install pytest checkdmarc
# run with:
# pytest -svv test_validate_domain_records.py

import pytest
from utils import validate_domain_records


@pytest.mark.parametrize(
    "test_domain,expected_result",
    [
        (
            "aaa",
            {
                "domain": "aaa",
                "error": "Invalid domain",
                "spf": "fail",
                "spf_error": None,
                "dmarc": "fail",
                "dmarc_error": None,
                "dkim": "fail",
                "dkim_error": None,
            },
        ),
        (
            "aaa.com",
            {
                "domain": "aaa.com",
                "error": "DKIM check failed",
                "spf": "fail",
                "spf_error": "No SPF record found",
                "dmarc": "fail",
                "dmarc_error": "Unrelated TXT record found at DMARC record",
                "dkim": "fail",
                "dkim_error": "No DKIM record found",
            },
        ),
        (
            "example.com",
            {
                "domain": "example.com",
                "error": None,
                "spf": "pass",
                "spf_error": None,
                "dmarc": "pass",
                "dmarc_error": None,
                "dkim": "pass",
                "dkim_error": None,
            },
        ),
    ],
)
def test_domain_record_check(test_domain, expected_result) -> None:
    """Test domain record validation"""
    result = validate_domain_records(test_domain)
    assert result == expected_result
