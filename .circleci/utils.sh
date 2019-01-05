#!/usr/bin/env bash
BOLD='\e[1m'
BLUE='\e[34m'
RED='\e[31m'
YELLOW='\e[33m'
GREEN='\e[92m'
NC='\e[0m'


info() {
    printf "\n${BOLD}${BLUE}====> $(echo $@ ) ${NC}\n"
}

warning () {
    printf "\n${BOLD}${YELLOW}====> $(echo $@ )  ${NC}\n"
}

error() {

    printf "\n${BOLD}${RED}====> $(echo $@ )  ${NC}\n"
    exit 1
}

success () {
    printf "\n${BOLD}${GREEN}====> $(echo $@ ) ${NC}\n"
}

is_success_or_fail() {
    if [ "$?" == "0" ]; then success $@; else error $@; fi
}

is_success() {
    if [ "$?" == "0" ]; then success $@; fi
}

# require "variable name" "value"
require () {
    if [ -z ${2+x} ]; then error "Required variable ${1} has not been set"; fi
}

SERVICE_KEY_PATH=$HOME/service-account-key.json

# assert required variables
require PRODUCTION_COMPUTE_ZONE $PRODUCTION_COMPUTE_ZONE
require PRODUCTION_CLUSTER_NAME $PRODUCTION_CLUSTER_NAME
require PRODUCTION_STATIC_IP $PRODUCTION_STATIC_IP

require STAGING_COMPUTE_ZONE $STAGING_COMPUTE_ZONE
require STAGING_CLUSTER_NAME $STAGING_CLUSTER_NAME
require STAGING_STATIC_IP $STAGING_STATIC_IP

if [ "$CIRCLE_BRANCH" == 'master' ]; then
    IMAGE_TAG=production-$(git rev-parse --short HEAD)
    export ENVIRONMENT=production
    export COMPUTE_ZONE=$PRODUCTION_COMPUTE_ZONE
    export CLUSTER_NAME=$PRODUCTION_CLUSTER_NAME
    export STATIC_IP=$PRODUCTION_STATIC_IP
else
    IMAGE_TAG=staging-$(git rev-parse --short HEAD)
    export ENVIRONMENT=staging
    export COMPUTE_ZONE=$STAGING_COMPUTE_ZONE
    export CLUSTER_NAME=$STAGING_CLUSTER_NAME
    export STATIC_IP=$STAGING_STATIC_IP
fi

export NAMESPACE=$ENVIRONMENT
