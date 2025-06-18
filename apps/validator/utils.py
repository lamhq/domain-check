import validators.domain as validate_domain
from checkdmarc.spf import (
    get_spf_record,
    SPFRecordNotFound,
    SPFIncludeLoop,
    SPFRedirectLoop,
    SPFSyntaxError,
    SPFTooManyDNSLookups,
)
from checkdmarc.dmarc import (
    get_dmarc_record,
    DMARCRecordNotFound,
    DMARCRecordInWrongLocation,
    MultipleDMARCRecords,
    SPFRecordFoundWhereDMARCRecordShouldBe,
    UnverifiedDMARCURIDestination,
    DMARCSyntaxError,
    InvalidDMARCTag,
    InvalidDMARCTagValue,
    InvalidDMARCReportURI,
    UnverifiedDMARCURIDestination,
    UnrelatedTXTRecordFoundAtDMARC,
    DMARCReportEmailAddressMissingMXRecords,
)


def validate_domain_records(domain: str) -> dict:
    result = {
        "domain": domain,
        "error": None,
        "spf": "fail",
        "spf_error": None,
        "dmarc": "fail",
        "dmarc_error": None,
    }

    if not validate_domain(domain):
        result["error"] = "Invalid domain"
        return result

    # SPF validation
    try:
        get_spf_record(domain)
        result["spf"] = "pass"
    except (
        SPFRecordNotFound,
        SPFIncludeLoop,
        SPFRedirectLoop,
        SPFSyntaxError,
        SPFTooManyDNSLookups,
    ) as e:
        error_messages = {
            SPFRecordNotFound: "No SPF record found",
            SPFIncludeLoop: "SPF include loop detected",
            SPFRedirectLoop: "SPF redirect loop detected",
            SPFSyntaxError: "Invalid SPF record syntax",
            SPFTooManyDNSLookups: "SPF record exceeds maximum DNS lookups (10)",
        }
        result["spf_error"] = error_messages.get(type(e), str(e))
        result["error"] = "Domain record check failed"
    except Exception as e:
        result["spf_error"] = str(e)
        result["error"] = "Domain record check failed"

    # DMARC validation
    try:
        get_dmarc_record(domain)
        result["dmarc"] = "pass"
    except (
        DMARCRecordNotFound,
        DMARCRecordInWrongLocation,
        MultipleDMARCRecords,
        SPFRecordFoundWhereDMARCRecordShouldBe,
        UnverifiedDMARCURIDestination,
        UnrelatedTXTRecordFoundAtDMARC,
        DMARCReportEmailAddressMissingMXRecords,
        DMARCSyntaxError,
        InvalidDMARCTag,
        InvalidDMARCTagValue,
        InvalidDMARCReportURI,
    ) as e:
        error_messages = {
            DMARCRecordNotFound: "No DMARC record found",
            DMARCRecordInWrongLocation: "DMARC record in wrong location",
            MultipleDMARCRecords: "Multiple DMARC records found",
            SPFRecordFoundWhereDMARCRecordShouldBe: "SPF record found where DMARC record should be",
            UnverifiedDMARCURIDestination: "Unverified DMARC URI destination",
            UnrelatedTXTRecordFoundAtDMARC: "Unrelated TXT record found at DMARC record",
            DMARCReportEmailAddressMissingMXRecords: "DMARC report email address missing MX records",
            DMARCSyntaxError: "Invalid DMARC record syntax",
            InvalidDMARCTag: "Invalid DMARC tag",
            InvalidDMARCTagValue: "Invalid DMARC tag value",
            InvalidDMARCReportURI: "Invalid DMARC report URI",
        }
        result["dmarc_error"] = error_messages.get(type(e), str(e))
        result["error"] = "Domain record check failed"
    except Exception as e:
        result["dmarc_error"] = str(e)
        result["error"] = "Domain record check failed"

    return result
