output "domain_validation"{
    value = aws_acm_certificate.cert.domain_validation_options
}

output "aws_acm_certificate_validation_arn" {
    value = aws_acm_certificate_validation.cert_validation.certificate_arn
}