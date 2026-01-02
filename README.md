# Pastebin ECS production grade deployment
The goal of the project is to deploy a code sharing application using AWS with automation via CI/CD pipelines.

## Key features

- Application written in React
- Containerised application using Docker, multi-stage build, making Docker image lightweight and running with non root user
- Utilised AWS ECS Fargate to deploy the container
- Automated infrastrcuture via Terraform, using modular comopnents such as: VPC, ECS, ALB, S3, Route53 and ACM.
- HTTPS enabled in ALB with certificates via ACM
- S3 Native locking for Terraform
- Utilised Terraform state lock using S3 native locking.
- Multi-AZ ECS deployment
- GitHub Actions employed for CI/CD, involving steps for Docker build and Terraform.
- OIDC for tighter security in pipelines.
- Domain managed via Cloudflare and AWS Route53

## Project structure
```
.github
└── workflows
│   ├── docker-build.yaml
│   ├── terraform-apply.yaml
│   ├── terraform-destroy.yaml
│   └── terraform-plan.yaml
├── app
│   ├── Dockerfile
├── terraform
│   ├── modules
│   │   ├── acm
│   │   ├── alb
│   │   ├── ecs
│   │   ├── route53
│   │   ├── s3
│   │   └── vpc
│   ├── providers.tf
│   ├── variables.tf
│   ├── backend.tf
│   └── main.tf
└── README.md
```


## Architecture overview


<img width="1000" height="800" alt="latest drawio" src="https://github.com/user-attachments/assets/e1427e43-2837-43ff-9f87-a52653f33e4f" />



## Traffic flow 
```
User → Cloudflare → Route 53 → Internet gateway (IGW) → Application Load Balancer (ALB) → Elastic Contianer Service (ECS)
```


## Demo video of app deployed live 
Excuse the domain name I had plans with it :D



https://github.com/user-attachments/assets/d0e6de77-ce94-43f3-b3c8-6184a58cd1e9






