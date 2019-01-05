#!/usr/bin/env bash
ROOT_DIR=$(pwd)

source $ROOT_DIR/.circleci/utils.sh

checkoutDeployScriptRepo(){
    source $ROOT_DIR/scripts/deploy/template.sh
}

# checkout
buildTagAndPushDockerImage() {
    require 'DOCKER_REGISTRY' $DOCKER_REGISTRY
    require 'PROJECT_ID' $PROJECT_ID
    require 'IMAGE_TAG' $IMAGE_TAG
    require 'SERVICE_KEY_PATH' $SERVICE_KEY_PATH

    # gcr.io/apprenticeship-projects/travela-frontend
    IMAGE_NAME="$DOCKER_REGISTRY/$PROJECT_ID/$PROJECT_NAME"
    TAGGED_IMAGE=$IMAGE_NAME:$IMAGE_TAG
    DOCKER_USERNAME=${DOCKER_USERNAME:-_json_key}

    info "Build docker image for travela application"
    docker build -t $IMAGE_NAME -f docker/Dockerfile .

    info "Tagging built docker image as $TAGGED_IMAGE"
    docker tag $IMAGE_NAME $TAGGED_IMAGE
    is_success "Image successfully tagged $TAGGED_IMAGE"

    info "Login to $DOCKER_REGISTRY container registry"
    is_success_or_fail $(docker login -u  $DOCKER_USERNAME --password-stdin https://${DOCKER_REGISTRY} < $SERVICE_KEY_PATH)

    info "Push $TAGGED_IMAGE to $DOCKER_REGISTRY container registry"
    docker push $TAGGED_IMAGE

    info "Logout of docker container registry"
    is_success_or_fail $(docker logout https://${DOCKER_REGISTRY})

}

buildLintAndDeployK8sConfiguration(){
    findTempateFiles 'TEMPLATES'
    findAndReplaceVariables

    info "Linting generated configuration files"
    k8s-lint -f deploy/travela-frontend.config
    is_success "Completed linting successfully"

    info "Initiating deployment for image $TAGGED_IMAGE to $ENVIRONMENT environment"
    k8s-deploy-and-verify -f deploy/travela-frontend.config
    is_success "$TAGGED_IMAGE successfully deployed"
}

main() {
    checkoutDeployScriptRepo
    buildTagAndPushDockerImage
    buildLintAndDeployK8sConfiguration
    cleanGeneratedYamlFiles
}

$@
