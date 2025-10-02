terraform {
    backend "s3" {
    bucket = "pastebin-bucket-shu"
    key    = "terraform.tfstate"
    region = "eu-west-2"
    use_lockfile = true
  } 
}