module "network" {
  source = "./modules/vpc"
}

module "alb" {
    source = "./modules/alb"
    vpc_id = module.network.vpc_id
    public_subnet_1_id = module.network.public_subnet_id_1
    public_subnet_2_id = module.network.public_subnet_id_2
    ecs_sg_id = module.ecs.ecs_sg_id
    aws_acm_certificate_validation_arn = module.acm.aws_acm_certificate_validation_arn
}

module "ecs" {
    source = "./modules/ecs"
    vpc_id = module.network.vpc_id
    alb_sg = module.alb.alb_sg
    pastebin_tg_arn = module.alb.pastebin_tg_arn
    private_subnet_1_id = module.network.private_subnet_id_1
    private_subnet_2_id = module.network.private_subnet_id_2
    image_tag = var.image_tag
    ecr_url = var.ecr_url
    ecr_repository = var.ecr_repository

}

module "route53" {
  source = "./modules/route53"
  alb_dns_name = module.alb.alb_dns_name
  alb_zone_id = module.alb.alb_zone_id
  domain_validation_options = module.acm.domain_validation
  domain_name = var.domain_name
  sub_domain_name = var.sub_domain_name
}

module "acm" {
  source = "./modules/acm"
  sub_domain_name = var.sub_domain_name
}