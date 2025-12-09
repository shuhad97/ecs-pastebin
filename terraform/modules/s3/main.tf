resource "aws_s3_bucket" "logs_bucket" {

  bucket = "pastebin-logs"

}

resource "aws_s3_bucket_policy" "alb_access" {
  bucket = aws_s3_bucket.logs_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AWSALBAccessLogsPolicy"
        Effect = "Allow"
        Principal = {
          Service = "logdelivery.elasticloadbalancing.amazonaws.com"
        }
        Action = [
          "s3:PutObject",
          "s3:GetBucketLocation"
        ]
        Resource = [
          "arn:aws:s3:::pastebin-logs",
        ]
      }
    ]
  })
}
