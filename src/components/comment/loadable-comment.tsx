import loadable from '@loadable/component';

const LoadableComment = loadable(() => import('./comment'));

export default LoadableComment;
