import loadable from '@loadable/component';

const LoadableComment = loadable(() => import('../comment/Comment'));

export default LoadableComment;
