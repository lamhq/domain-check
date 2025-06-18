# To run this install the follow packages
# pip install pytest checkdmarc
# run with:
# pytest -svv test_validate_domain_records.py

import pytest
from main import validate_domain_records


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
            },
        ),
        (
            "aaa.com",
            {
                "domain": "aaa.com",
                "error": "Domain record check failed",
                "spf": "fail",
                "spf_error": "No SPF record found",
                "dmarc": "fail",
                "dmarc_error": "Unrelated TXT record found at DMARC record",
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
            },
        ),
    ],
)
def test_domain_record_check(test_domain, expected_result) -> None:
    """Test domain record validation"""
    result = validate_domain_records(test_domain)
    assert result == expected_result
