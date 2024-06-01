import { createStarport } from '../../../src'
import TheImage from '~/components/TheImage.vue'

export const { container: TheImageContainer, proxy: TheImageProxy } = createStarport(TheImage)
