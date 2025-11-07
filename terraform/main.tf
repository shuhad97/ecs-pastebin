module "network" {
  source = "./modules/vpc"
}

module "alb" {
    source = "./modules/alb"
    vpc_id = module.network.vpc_id
    public_subnet_1_id = module.network.public_subnet_id_1
    public_subnet_2_id = module.network.public_subnet_id_2
    # ecs_sg_id = module.ecs.ecs_sg_id
}

module "ecs" {
    source = "./modules/ecs"
    vpc_id = module.network.vpc_id
    alb_id = module.alb.alb_id
    ecs_target_group_arn = module.alb.ecs_target_group_arn
}