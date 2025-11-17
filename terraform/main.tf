module "network" {
  source = "./modules/vpc"
}

module "alb" {
    source = "./modules/alb"
    vpc_id = module.network.vpc_id
    public_subnet_1_id = module.network.public_subnet_id_1
    public_subnet_2_id = module.network.public_subnet_id_2
    ecs_sg_id = module.ecs.ecs_sg_id
}

module "ecs" {
    source = "./modules/ecs"
    vpc_id = module.network.vpc_id
    alb_sg = module.alb.alb_sg
    pastebin_tg_arn = module.alb.pastebin_tg_arn
    private_subnet_1_id = module.network.private_subnet_id_1
    private_subnet_2_id = module.network.private_subnet_id_2

}

module "route54" {
  source = "./modules/route53"
  alb_dns_name = module.alb.alb_dns_name
  alb_zone_id = module.alb.alb_zone_id
}