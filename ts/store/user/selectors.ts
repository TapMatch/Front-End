import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

export const useIsAuthorisedSelector = () =>
  useSelector(({ user }) => user.isAuthorised)
