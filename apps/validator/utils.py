import dns.resolver
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


class DKIMRecordNotFound(Exception):
    pass


def get_dkim_record(domain, selectors=None):
    if selectors is None:
        selectors = ["default", "selector1", "google", "selector2", "s1", "s2"]

    dkim_records = {}

    for selector in selectors:
        dkim_domain = f"{selector}._domainkey.{domain}"
        try:
            answers = dns.resolver.resolve(dkim_domain, "TXT")
            for rdata in answers:
                txt_record = "".join(s.decode("utf-8") for s in rdata.strings)
                if "v=DKIM1" in txt_record:
                    dkim_records[selector] = txt_record
        except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.resolver.Timeout):
            continue

    if not dkim_records:
        raise DKIMRecordNotFound("No DKIM record found")

    return dkim_records


def validate_domain_records(domain: str) -> dict:
    result = {
        "domain": domain,
        "error": None,
        "spf": "fail",
        "spf_error": None,
        "dmarc": "fail",
        "dmarc_error": None,
        "dkim": "fail",
        "dkim_error": None,
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
        result["error"] = "SPF check failed"
    except Exception as e:
        result["spf_error"] = str(e)
        result["error"] = "SPF check failed"

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
        result["error"] = "DMARC check failed"
    except Exception as e:
        result["dmarc_error"] = str(e)
        result["error"] = "DMARC check failed"

    # DKIM validation
    try:
        get_dkim_record(domain)
        result["dkim"] = "pass"
    except DKIMRecordNotFound as e:
        result["dkim_error"] = "No DKIM record found"
        result["error"] = "DKIM check failed"
    except Exception as e:
        result["dkim_error"] = str(e)
        result["error"] = "DKIM check failed"

    return result
