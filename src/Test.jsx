import React, { useMemo, useState, useEffect, useRef } from 'react'
import {
  Layout,
  Input,
  List,
  Avatar,
  Collapse,
  Modal,
  Button,
  message as messageC,
  Timeline,
  Radio,
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import remarkMath from 'remark-math'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // 引入KaTeX样式
import 'highlight.js/styles/github-dark.css'
import { debounce } from 'lodash'
// import dayjs from 'dayjs';
import './Test.css'

const { Header, Content } = Layout
const { TextArea } = Input

const token =
  'bce-v3/ALTAK-b2Wklq6P62EDiroiLnTJg/170f50960ce89ef0e95ae0ea94d7461499b75340;ZjkyZmQ2YmQxZTQ3NDcyNjk0ZTg1ZjYyYjlkZjNjODB8AAAAABMCAAB604Dq8G5kBz+z2FhOJOszzapraGQSxhPouql+NRb0WrDr/pvOt1I8c42HAncGzsgYxYMYFuLnQJYZTGc+BE0YL+23c7ENxL50hyIIJLertDMCr+ZC5ET3awhLm/AglXrqFB6KJW0P1jxjA6BMNkcPTt7OPntXxPnpD6OBpi1nx1qi5MaU5AxmCL+jhfl2fqSz5bcl845nYGqxQxnOwvM2E6E9tCKSQ6P1qZ/1m67ypB0+cK+MoGT2e067UdvFkQLmCPgzC3l6FShmpAdrXJmEvS4OJoNIqfc07Zq3tpZCmMOZ8FL75bnJhEhBWYb1INVJTvaGW0NuSv+zzoStpbnNWw1cM0dSQq7sz74YqeRUw1phl7GCe/ZMo2ZJ5QgSuiO1b6l0xNN3FHHytCooKmfAsmTAyKIppGpI72eu4ZU8QEX7iW3DUsO+4E/DIYLPabg='

const ZanSvg = () => (
  <svg
    t='1741880116102'
    class='icon'
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='13518'
    width='22'
    height='22'
  >
    <path
      d='M604.2 205.9c16.2 8.4 30.4 22.7 42.8 41.5 20.1 31.1 32.4 75.8 35 126.3 1.9 40.8-2.6 82.9-13 119.8h154.2c36.3 0 67.4 9.1 90.7 25.9 24 17.5 37.6 42.8 38.2 70.6v0.6c0 21.4-8.4 47.3-20.7 64.1 13.6 15.5 20.7 36.3 20.7 61.5 0 29.8-20.7 57.7-41.5 72.5 5.2 11.7 7.1 25.3 7.1 34.3 0 33.7-20.1 60.2-55.1 74.5 3.2 7.8 4.5 16.2 4.5 26.6 0 31.7-13 57.7-37.6 74.5-24 16.8-58.3 25.3-101.7 25.3h-246c-27.2 0-57.7-5.8-80.3-14.9-9.1-3.9-17.5-7.8-23.3-11-1.3-0.6-3.2-1.3-4.5-1.9-1.3 0.6-1.9 1.9-3.2 2.6-1.9 1.3-3.9 3.2-5.8 4.5-14.3 10.4-29.8 20.1-48.6 20.7h-66.7c-28.5 0-51.8-9.1-68-26.6-14.9-16.2-24-39.5-25.9-68.7l-30.4-324.5v-1.3c0-30.4 9.1-57.6 25.9-77.7 17.5-20.7 42.1-31.7 69.3-31.7H338c16.2 0 42.8-5.2 77.1-30.4 24-18.1 38.9-36.3 42.1-42.1 11-26.6 21.4-55.7 21.4-125 0-8.4 0-34.3 11-57 9.1-20.1 29.8-43.4 72.6-43.4 14.8 0 28.4 3.9 42 10.4z'
      fill='#2c2c2c'
      p-id='13519'
    ></path>
    <path
      d='M616.7 144.2a2.3 12.2 0 1 0 4.6 0 2.3 12.2 0 1 0-4.6 0Z'
      fill='#2c2c2c'
      p-id='13520'
    ></path>
    <path
      d='M627.571704 142.656012a12.2 2.3 60 1 0 3.983717-2.3 12.2 2.3 60 1 0-3.983717 2.3Z'
      fill='#2c2c2c'
      p-id='13521'
    ></path>
    <path
      d='M636.311797 135.919689a12.2 2.3 30 1 0 2.3-3.983717 12.2 2.3 30 1 0-2.3 3.983717Z'
      fill='#2c2c2c'
      p-id='13522'
    ></path>
    <path
      d='M628.3 123.4a12.2 2.3 0 1 0 24.4 0 12.2 2.3 0 1 0-24.4 0Z'
      fill='#2c2c2c'
      p-id='13523'
    ></path>
    <path
      d='M627.328131 118.880268a2.3 12.2 60 1 0 21.13102-12.2 2.3 12.2 60 1 0-21.13102 12.2Z'
      fill='#2c2c2c'
      p-id='13524'
    ></path>
    <path
      d='M624.189866 115.445957a2.3 12.2 30 1 0 12.2-21.131019 2.3 12.2 30 1 0-12.2 21.131019Z'
      fill='#2c2c2c'
      p-id='13525'
    ></path>
    <path
      d='M617.4 101.9a2.3 12.2 0 1 0 4.6 0 2.3 12.2 0 1 0-4.6 0Z'
      fill='#2c2c2c'
      p-id='13526'
    ></path>
    <path
      d='M607.088802 105.649823a12.2 2.3 60 1 0 3.983717-2.3 12.2 2.3 60 1 0-3.983717 2.3Z'
      fill='#2c2c2c'
      p-id='13527'
    ></path>
    <path
      d='M600.042483 114.130839a12.2 2.3 30 1 0 2.3-3.983717 12.2 2.3 30 1 0-2.3 3.983717Z'
      fill='#2c2c2c'
      p-id='13528'
    ></path>
    <path
      d='M586 122.6a12.2 2.3 0 1 0 24.4 0 12.2 2.3 0 1 0-24.4 0Z'
      fill='#2c2c2c'
      p-id='13529'
    ></path>
    <path
      d='M590.235205 139.41267a2.3 12.2 60 1 0 21.13102-12.2 2.3 12.2 60 1 0-21.13102 12.2Z'
      fill='#2c2c2c'
      p-id='13530'
    ></path>
    <path
      d='M602.351017 151.801873a2.3 12.2 30 1 0 12.2-21.131019 2.3 12.2 30 1 0-12.2 21.131019Z'
      fill='#2c2c2c'
      p-id='13531'
    ></path>
    <path
      d='M367.4 187.6m-14.8 0a14.8 14.8 0 1 0 29.6 0 14.8 14.8 0 1 0-29.6 0Z'
      fill='#2c2c2c'
      p-id='13532'
    ></path>
    <path
      d='M737.5 164.8c2.3 0 4.2 1.9 4.2 4.2v45.5c0 2.3-1.9 4.2-4.2 4.2s-4.2-1.9-4.2-4.2V169c0-2.4 1.9-4.2 4.2-4.2z'
      fill='#2c2c2c'
      p-id='13533'
    ></path>
    <path
      d='M714.7 187.5h45.5c2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2h-45.5c-2.3 0-4.2-1.9-4.2-4.2 0.1-2.4 1.9-4.2 4.2-4.2z'
      fill='#2c2c2c'
      p-id='13534'
    ></path>
    <path
      d='M270.2 222.6c5.9-3 8.8-9 6.6-13.3l-43.4-84.1c-2.2-4.3-8.8-5.3-14.7-2.3-5.9 3-8.8 9-6.6 13.3l43.4 84.1c2.2 4.3 8.8 5.3 14.7 2.3z'
      fill='#2c2c2c'
      p-id='13535'
    ></path>
    <path
      d='M294.3 147c-3-5.9-9-8.8-13.3-6.6l-84.1 43.4c-4.3 2.2-5.3 8.8-2.3 14.7s9 8.8 13.3 6.6l84.1-43.4c4.3-2.2 5.3-8.8 2.3-14.7z'
      fill='#2c2c2c'
      p-id='13536'
    ></path>
    <path
      d='M442.8 8.2c20.8 0 37.7 16.8 37.7 37.4S463.6 83 442.8 83c-20.8 0-37.7-16.8-37.7-37.4S422 8.2 442.8 8.2z m0 64.8c15.3 0 27.8-12.3 27.8-27.5S458.1 18 442.8 18 415 30.3 415 45.5 427.5 73 442.8 73z'
      fill='#2c2c2c'
      p-id='13537'
    ></path>
    <path
      d='M674 1006.1h-81.3c-8.3 0-15-6.7-15-15s6.7-15 15-15H674c40.5 0 71.8-7.6 93.1-22.5l0.2-0.1c20.3-13.9 31-35.4 31-62.1 0-8.8-1-15.2-3.4-20.8l-5.8-14 14-5.7c29.5-12 45.7-33.5 45.7-60.6 0-7-1.5-18.6-5.8-28.2l-5-11.2 9.9-7.1c17.5-12.6 35.2-36.1 35.2-60.4 0-21.4-5.7-38.8-17-51.7l-7.9-9 7.1-9.7c10.5-14.4 17.8-37.1 17.8-55.3v-0.5c-0.6-23.2-12-44-32.1-58.7-20.8-15.1-49.2-23-81.8-23h-174l5.3-19.1c9.9-35.1 14.3-76 12.4-115.1-2.5-47.9-14-90.1-32.6-118.9-11.1-17-23.5-29.2-36.8-36.2-12.7-6-23.9-8.8-35.4-8.8-35.8 0-51.8 18.8-58.9 34.6l-0.2 0.4c-9.5 19.6-9.5 42.8-9.5 50.5 0 70.6-10.7 102.1-22.5 130.8l-0.3 0.8-0.4 0.7c-4.4 7.9-20.8 27.6-46.2 46.8l-0.2 0.1c-37.5 27.6-67.4 33.4-86 33.4H166.2c-22.9 0-43.5 9.4-57.8 26.4C93.8 519.3 86 542.9 86 570v0.6l3.5 37.7c0.8 8.2-5.3 15.6-13.5 16.3-8.2 0.8-15.6-5.3-16.3-13.5L56 572v-2c0-34.2 10.2-64.4 29.4-87.4 20.2-23.9 48.9-37.1 80.8-37.1h117.9c14 0 37.2-4.8 68.1-27.5 21.4-16.2 34.6-32.1 37.6-36.8 10.9-26.4 19.8-53.9 19.8-118.3 0-9.3 0-37.6 12.4-63.4 6.5-14.2 16.3-26.3 28.5-35.1 15.7-11.3 35.1-17 57.6-17 16 0 31.8 3.9 48.6 11.8l0.5 0.2c18 9.4 34.3 25 48.4 46.5 21.4 33.5 34.7 81 37.4 134.1 1.7 35.4-1.4 72.2-8.7 105.6h135c39 0 73.4 9.9 99.5 28.8 27.9 20.4 43.7 49.6 44.4 82.4v1c0 20.6-6.8 44.7-17.4 63.4 11.6 17.1 17.4 38 17.4 62.3 0 32.2-19.3 60.3-38.7 77.5 4 13.5 4.4 25.4 4.4 29.4 0 35.3-18.8 64.9-52.1 82.6 1.1 5.6 1.6 11.7 1.6 18.4 0 36.5-15.6 67.4-44 86.8-26.6 18.5-63.7 27.9-110.4 27.9z'
      fill='#2c2c2c'
      p-id='13538'
    ></path>
    <path
      d='M91.7 808.1c-7.7 0-14.2-5.8-14.9-13.6l-12-128.4c-0.8-8.2 5.3-15.6 13.5-16.3 8.3-0.8 15.6 5.3 16.3 13.5l12 128.4c0.8 8.2-5.3 15.6-13.5 16.3-0.4 0.1-0.9 0.1-1.4 0.1z'
      fill='#2c2c2c'
      p-id='13539'
    ></path>
    <path
      d='M502.1 1006.1h-74.2c-28.8 0-60.9-6-85.9-16l-0.3-0.1c-8-3.4-14.7-6.5-19.9-9.2-0.7 0.6-1.6 1.2-2.5 1.8-16.2 11.7-34.2 22.7-56.7 23.4h-67.2c-32.7 0-60-10.8-79-31.4-17.4-18.9-27.7-45.7-29.9-77.7L82.7 857c-0.8-8.2 5.3-15.6 13.5-16.3 8.2-0.8 15.6 5.3 16.3 13.5l3.8 40.7c1.7 25.1 9.3 45.7 22 59.5 13.3 14.4 32.5 21.7 57 21.7h66.4c13.6-0.5 25.8-7.5 40-17.9l0.5-0.4c0.3-0.2 1.1-0.8 1.6-1.3 1.1-0.9 2.4-2 3.9-3 1-1 2.7-2.5 5.1-3.7l6.7-3.4 6.7 3.4c0.3 0.1 0.7 0.3 1.1 0.5 1 0.4 2.2 0.9 3.4 1.5l0.6 0.3c4.8 2.7 12.3 6.2 21.8 10.3 21.3 8.5 49.9 13.8 74.6 13.8h74.2c8.3 0 15 6.7 15 15s-6.5 14.9-14.8 14.9z'
      fill='#2c2c2c'
      p-id='13540'
    ></path>
    <path
      d='M320.7 970c-7.9 0-14.5-6.2-15-14.2l-26.5-495c-0.4-8.3 5.9-15.3 14.2-15.8 8.3-0.4 15.3 5.9 15.8 14.2l26.5 495c0.4 8.3-5.9 15.3-14.2 15.8h-0.8z'
      fill='#2c2c2c'
      p-id='13541'
    ></path>
    <path
      d='M188.4 628.7c-7.9 0-14.5-6.2-15-14.2l-2.8-49.5c-0.5-8.3 5.9-15.3 14.1-15.8 8.3-0.5 15.3 5.9 15.8 14.1l2.8 49.5c0.5 8.3-5.9 15.3-14.1 15.8-0.3 0.1-0.5 0.1-0.8 0.1zM200.2 842.3c-7.9 0-14.5-6.2-15-14.2l-8.1-145.7c-0.5-8.3 5.9-15.3 14.1-15.8 8.3-0.5 15.3 5.9 15.8 14.1l8.1 145.7c0.5 8.3-5.9 15.3-14.1 15.8-0.2 0-0.5 0.1-0.8 0.1z'
      fill='#2c2c2c'
      p-id='13542'
    ></path>
  </svg>
)

const CancelSvg = () => (
  <svg
    t='1741882059389'
    class='icon'
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='19544'
    width='32'
    height='32'
  >
    <path
      d='M512 928.3c-229.2 0-415-185.8-415-415s185.8-415 415-415 415 185.8 415 415-185.8 415-415 415z m0.4-77.5c186.2 0 337.2-151 337.2-337.2s-151-337.2-337.2-337.2-337.2 151-337.2 337.2 150.9 337.2 337.2 337.2zM382.3 357.6h259.4c14.3 0 25.9 11.6 25.9 25.9V643c0 14.3-11.6 25.9-25.9 25.9H382.3c-14.3 0-25.9-11.6-25.9-25.9V383.6c0-14.4 11.6-26 25.9-26z'
      p-id='19545'
    ></path>
  </svg>
)

const SendSvg = () => (
  <svg
    t='1741878968290'
    class='icon'
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='15096'
    width='32'
    height='32'
  >
    <path
      d='M233.984 489.472l131.072 92.672c13.824 9.728 32.768 8.192 44.544-3.584l188.416-188.416c9.728-9.728 26.112-9.728 35.84 0 9.728 9.728 9.728 26.112 0 35.84L445.44 614.4c-11.776 11.776-13.824 30.72-3.584 44.544l92.672 131.072c32.768 46.592 104.448 35.84 122.368-18.432l158.208-475.136c17.92-54.272-33.792-105.984-88.064-88.064l-474.624 158.72c-54.272 17.92-64.512 89.6-18.432 122.368z'
      fill='#2c2c2c'
      p-id='15097'
    ></path>
  </svg>
)

const ChatInterface = () => {
  const [authCode, setAuthCode] = useState()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [controller, setController] = useState(null)
  const [activeKey, setActiveKey] = useState({})
  const [think, setThink] = useState({})
  const [message, setMessage] = useState([])
  const [fortune, setFortune] = useState({})
  const [input, setInput] = useState('')
  const [stopScroll, setStopScroll] = useState(false)
  const [loading, setLoading] = useState(false)
  // 联网搜索
  const [onlineSearch, setOnlineSearch] = useState(false)

  const scrollRef = useRef()
  const messagesEndRef = useRef(null)
  const thinkEndRef = useRef(null)
  const currentTimestampRef = useRef(null)
  const [isAbort, setIsAbort] = useState(false)

  const [taskType, setTaskType] = useState('deepseek')
  const [thinkDone, setThinkDone] = useState(false)
  const [pendingObj, setPendingObj] = useState({})
  const [timeLine, setTimeLine] = useState({})
  const [messageApi, contextHolder] = messageC.useMessage()

  useEffect(() => {
    if (scrollRef.current && !stopScroll) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
    }
  }, [think, fortune]) // 空依赖数组，确保只在组件挂载时执行

  // 监听滚动事件（防抖处理）
  useEffect(() => {
    const handleScroll = () => {
      // 滚动高度 > 可视高度，说明存在溢出内容
      if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
        console.debug('qweqwe')
        setStopScroll(true)
      }
    }

    scrollRef.current?.addEventListener('wheel', handleScroll)
    return () => scrollRef.current?.removeEventListener('wheel', handleScroll)
  }, [])

  useEffect(() => {
    // setOpen(true)
  }, [])

  useEffect(() => {
    if (!loading) {
      currentTimestampRef.current = null
    }
  }, [loading])

  useEffect(() => {
    if (!onlineSearch && thinkDone) {
      console.debug('can')
      // 回答生成，思考结束，清除pending状态
      setPendingObj((pre) => ({
        ...pre,
        [currentTimestampRef?.current]: null,
      }))
      //
      setTimeLine((pre) => ({
        ...pre,
        [currentTimestampRef?.current]: [
          ...(pre?.[currentTimestampRef?.current] ?? []),
          { color: 'green', children: '逻辑推理' },
        ],
      }))
    } else if (onlineSearch && thinkDone) {
      console.debug('联网======')
      // 联网搜索
      setPendingObj((pre) => ({
        ...pre,
        [currentTimestampRef?.current]: null,
      }))
      setTimeLine((pre) => ({
        ...pre,
        [currentTimestampRef?.current]: [
          ...(pre?.[currentTimestampRef?.current] ?? []),
          { color: 'green', children: '网络搜索' },
        ],
      }))
    }
  }, [thinkDone, onlineSearch])

  useEffect(() => {
    let timeoutId
    if (loading) {
      timeoutId = setTimeout(() => {
        if (
          !onlineSearch &&
          (think[currentTimestampRef?.current] ?? '')?.length <= 0
        ) {
          if (controller) {
            controller?.abort()
            setFortune((pre) => ({
              ...pre,
              [currentTimestampRef?.current]: '服务器繁忙！',
            }))
          }
        }
      }, 3000)
    }

    return () => clearTimeout(timeoutId)
  }, [onlineSearch, think, controller, loading])

  const streamDeepSeek = async (callback) => {
    setInput('')
    setLoading(true)

    setPendingObj((pre) => ({
      ...pre,
      [currentTimestampRef?.current]: '分析请求',
    }))
    setTimeout(() => {
      setPendingObj((pre) => ({ ...pre, [currentTimestampRef?.current]: null }))
      setTimeLine((pre) => ({
        ...pre,
        [currentTimestampRef?.current]: [
          ...(pre?.[currentTimestampRef?.current] ?? []),
          { color: 'green', children: '分析请求' },
        ],
      }))
    }, 800)

    const newController = new AbortController()
    setController(newController)

    setTimeout(async () => {
      try {
        setPendingObj((pre) => ({
          ...pre,
          [currentTimestampRef?.current]: '逻辑推理',
        }))

        const historyMessages = (message ?? []).map((item) => {
          if (item?.isBot) {
            return {
              role: 'assistant',
              content: [
                {
                  type: 'text',
                  text: fortune?.[item?.timestamp],
                },
              ],
            }
          } else {
            return {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: item?.text,
                },
              ],
            }
          }
        })

        const response = await fetch(
          'https://qianfan.baidubce.com/v2/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'deepseek-r1',
              prompt: input,
              messages: [
                ...historyMessages,
                { role: 'user', content: [{ type: 'text', text: input }] },
              ],
              stream: true,
              penalty_score: 1,
              temperature: 0.8,
              top_p: 0.8,
            }),
            signal: newController.signal,
          }
        )

        if (response.status !== 200) {
          // 清空正在pending
          setPendingObj((pre) => ({
            ...pre,
            [currentTimestampRef?.current]: null,
          }))
          // 增加终止状态
          setTimeLine((pre) => ({
            ...pre,
            [currentTimestampRef?.current]: [
              ...(pre?.[currentTimestampRef?.current] ?? []),
              { color: 'red', children: '已终止' },
            ],
          }))

          setFortune((pre) => ({
            ...pre,
            [currentTimestampRef?.current]: '服务器繁忙！',
          }))
          return
        } else if (response.status === 200) {
          const reader = response?.body?.getReader()
          const decoder = new TextDecoder()

          while (true) {
            const { done, value } = (await reader?.read()) ?? {}

            // 回答结束
            if (done) {
              setLoading(false)
              setPendingObj((pre) => ({
                ...pre,
                [currentTimestampRef?.current]: null,
              }))
              setTimeLine((pre) => ({
                ...pre,
                [currentTimestampRef?.current]: [
                  ...(pre?.[currentTimestampRef?.current] ?? []),
                  { color: 'green', children: '输出结果' },
                ],
              }))
              //   currentTimestampRef.current = null;
              break
            }
            const chunk = decoder.decode(value)
            try {
              const jsonStr = String(chunk).replace('data: ', '')
              const parsed = JSON.parse(jsonStr)
              callback(
                parsed.choices?.[0]?.delta?.reasoning_content,
                parsed.choices?.[0]?.delta?.content
              )
            } catch (e) {
              console.error('Chunk Analysis failed:', e)
            }
          }
        }
      } finally {
        setLoading(false)
      }
    }, 800)
  }

  const streamInter = async (callback) => {
    setInput('')
    setLoading(true)
    setPendingObj((pre) => ({
      ...pre,
      [currentTimestampRef?.current]: '网络搜索',
    }))

    const newController = new AbortController()
    setController(newController)

    try {
      const historyMessages = (message ?? []).map((item) => {
        if (item?.isBot) {
          return {
            role: 'assistant',
            content: [
              {
                type: 'text',
                text: fortune?.[item?.timestamp],
              },
            ],
          }
        } else {
          return {
            role: 'user',
            content: [
              {
                type: 'text',
                text: item?.text,
              },
            ],
          }
        }
      })

      const response = await fetch(
        'https://qianfan.baidubce.com/v2/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stream: true,
            prompt: input,
            messages: [
              ...historyMessages,
              { role: 'user', content: [{ type: 'text', text: input }] },
            ],
            model: 'ernie-4.5-8k-preview',
            stream_options: {
              include_usage: true,
            },
            temperature: 0.8,
            top_p: 0.8,
            penalty_score: 1,
            disable_search: false,
            enable_citation: false,
            web_search: {
              enable: true,
              enable_trace: false,
            },
            extra_parameters: {
              request_source: 'qianfan_playground',
            },
          }),
          signal: newController.signal,
        }
      )

      console.debug(response.status, 'status')

      if (response.status !== 200) {
        // 清空正在pending
        setPendingObj((pre) => ({
          ...pre,
          [currentTimestampRef?.current]: null,
        }))
        // 增加终止状态
        setTimeLine((pre) => ({
          ...pre,
          [currentTimestampRef?.current]: [
            ...(pre?.[currentTimestampRef?.current] ?? []),
            { color: 'red', children: '已终止' },
          ],
        }))

        setFortune((pre) => ({
          ...pre,
          [currentTimestampRef?.current]: '服务器繁忙！',
        }))
        return
      } else if (response.status === 200) {
        const reader = response?.body?.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = (await reader?.read()) ?? {}

          // 回答结束
          if (done) {
            setLoading(false)
            setPendingObj((pre) => ({
              ...pre,
              [currentTimestampRef?.current]: null,
            }))
            setTimeLine((pre) => ({
              ...pre,
              [currentTimestampRef?.current]: [
                ...(pre?.[currentTimestampRef?.current] ?? []),
                { color: 'green', children: '输出结果' },
              ],
            }))
            // currentTimestampRef.current = null;
            break
          }
          const chunk = decoder.decode(value)
          try {
            const jsonStr = String(chunk).replace('data: ', '')
            const parsed = JSON.parse(jsonStr)

            callback(undefined, parsed.choices?.[0]?.delta?.content)
          } catch (e) {
            console.error('Chunk Analysis failed:', e)
          }
        }
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    if (loading) return
    e.preventDefault()
    if (input.trim()) {
      let fullResponse = ''
      let fullThink = ''

      // 记录当前时间节点
      const currentTimestamp = new Date().toISOString()
      currentTimestampRef.current = currentTimestamp

      if (!onlineSearch) {
        setThink((pre) => ({ ...pre, [currentTimestamp]: '' }))
        setActiveKey((pre) => ({ ...pre, [currentTimestamp]: '1' }))
      }

      // 开启自动滚动
      setStopScroll(false)
      setThinkDone(false)
      setStopScroll(false)
      setMessage((pre) => [
        ...pre,
        { isBot: false, timestamp: currentTimestamp, text: input },
        { isBot: true, timestamp: currentTimestamp, text: '' },
      ])

      setFortune((pre) => ({ ...pre, [currentTimestamp]: '' }))

      const service = onlineSearch ? streamInter : streamDeepSeek

      // 调用
      await service((think, text) => {
        if (think) {
          fullThink += think
          setThink((pre) => ({ ...pre, [currentTimestamp]: fullThink }))
        }

        if (text) {
          // 代表推理结束
          setThinkDone(true)
          setPendingObj((pre) => ({
            ...pre,
            [currentTimestampRef?.current]: '输出结果',
          }))

          fullResponse += text
          setFortune((pre) => ({ ...pre, [currentTimestamp]: fullResponse }))
        }
      }, false)
      console.debug('qweqwewqe')
    }
  }

  const handleCancel = () => {
    if (controller) {
      try {
        controller.abort()
        setController(null)

        setPendingObj((pre) => ({
          ...pre,
          [currentTimestampRef?.current]: null,
        }))
        setTimeLine((pre) => ({
          ...pre,
          [currentTimestampRef?.current]: [
            ...(pre?.[currentTimestampRef?.current] ?? []),
            { color: 'red', children: '已终止' },
          ],
        }))

        setIsAbort((pre) => ({
          ...pre,
          [currentTimestampRef?.current]: '已停止回答',
        }))

        // currentTimestampRef.current = null
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Layout className='layout-container'>
        <Header className='header'>
          <h1 style={{ color: '#333', margin: 0 }}>
            {/* <Icon component={ZanSvg} /> */}
            <span style={{ marginLeft: 4, userSelect: 'none' }}>ZenX</span>
          </h1>
        </Header>

        <Content className='content' ref={scrollRef}>
          <List
            className='list'
            bordered={false}
            dataSource={message}
            split={false}
            locale={{
              emptyText: (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    flexFlow: 'column',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: '#333',
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    ZenX-全识
                  </div>
                  <span style={{ color: '#333' }}>
                    任何天马行空的想法，
                    我都可以帮你搜索、答疑、推理、写作、提建议，请把你想到的告诉我吧。
                  </span>
                </div>
              ),
            }}
            renderItem={(item) => (
              <List.Item
                className={`message-item ${item.isBot ? 'bot' : 'user'}`}
              >
                <div className='message-container'>
                  {/* {item.isBot && (
                    <div>
                      <Avatar
                        size='large'
                        style={{ backgroundColor: '#fff' }}
                        icon={<Icon component={ZanSvg} />}
                      />
                      <span>量子跃迁</span>
                    </div>
                  )} */}
                  <div
                    className={`message-content ${
                      item.isBot ? 'bot-content' : 'user-content'
                    }`}
                  >
                    {item.isBot ? (
                      <>
                        <Timeline
                          pending={pendingObj?.[item?.timestamp]}
                          items={timeLine?.[item?.timestamp]}
                        />
                        {think?.[item?.timestamp] && (
                          <Collapse
                            activeKey={activeKey?.[item?.timestamp]}
                            onChange={(val) =>
                              setActiveKey((pre) => ({
                                ...pre,
                                [item?.timestamp]:
                                  val?.[0] === '1' ? val : null,
                              }))
                            }
                            bordered={false}
                            items={[
                              {
                                key: '1',
                                label: (
                                  <div
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: 4,
                                    }}
                                  >
                                    推理过程
                                    {/* <Icon
                                    style={{ width: 18, height: 18 }}
                                    component={SeekSvg}
                                  /> */}
                                    {/* <Timeline
                                    pending={pendingObj?.[item?.timestamp]}
                                    items={timeLine?.[item?.timestamp]}
                                  /> */}
                                    {/* <p className='think-title'>
                                    {fortune?.[item?.timestamp]
                                      ? '已逻辑推理'
                                      : '思考中:'}
                                  </p> */}
                                  </div>
                                ),
                                children: (
                                  <>
                                    {think?.[item?.timestamp] ||
                                    fortune?.[item?.timestamp] ? (
                                      <p className='think-text'>
                                        {think?.[item?.timestamp]}
                                        <div ref={thinkEndRef} />
                                      </p>
                                    ) : (
                                      <LoadingOutlined />
                                    )}
                                  </>
                                ),
                              },
                            ]}
                          />
                        )}
                        {fortune?.[item?.timestamp] && (
                          <ReactMarkdown
                            children={fortune?.[item?.timestamp]}
                            remarkPlugins={[
                              remarkMath,
                              remarkGfm,
                              rehypeHighlight,
                            ]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) {
                                const match = /language-(\w+)/.exec(
                                  className || ''
                                )
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    children={String(children).replace(
                                      /\n$/,
                                      ''
                                    )}
                                    language={match[1]}
                                    PreTag='div'
                                    {...props}
                                  />
                                ) : (
                                  // <div className="code-block">
                                  //   <span className="lang-tag">{match[1]}</span>
                                  //   <code className={className} {...props}>
                                  //     {children}
                                  //   </code>
                                  //   <button onClick={() => {
                                  //       //
                                  //   }}>复制</button>
                                  // </div>
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                )
                              },
                            }}
                          >
                            {/* {fortune?.[item?.timestamp]} */}
                          </ReactMarkdown>
                        )}
                        {isAbort[item?.timestamp] && (
                          <span
                            style={{
                              display: 'inline-block',
                              borderRadius: 5,
                              padding: 3,
                              marginTop: 4,
                              backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            }}
                          >
                            {isAbort[item?.timestamp]}
                          </span>
                        )}
                      </>
                    ) : (
                      <div className='user-question'>{item.text}</div>
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />
          <div ref={messagesEndRef} />
        </Content>

        <div className='input-container'>
          <div className='input-content'>
            <div style={{ display: 'flex', width: '100%' }}>
              <TextArea
                className='input'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={(e) => {
                  if (loading) return
                  e.preventDefault()
                  handleSubmit(e)
                }}
                autoSize={{ minRows: 1, maxRows: 3 }}
                placeholder='输入任何你想到的'
              />
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  gap: 8,
                  width: '100%',
                }}
              >
                <Radio.Group
                  disabled={loading}
                  optionType='button'
                  onChange={(e) => {
                    setTaskType(e.target.value)
                    setOnlineSearch(false)
                  }}
                  value={taskType}
                  options={[
                    {
                      label: '深度思考(R1)',
                      value: 'deepseek',
                    },
                  ]}
                />
                <Radio.Group
                  disabled={loading}
                  optionType='button'
                  onChange={(e) => {
                    setTaskType(e.target.value)
                    setOnlineSearch(true)
                  }}
                  value={taskType}
                  options={[
                    {
                      label: '联网搜索',
                      value: 'onlinesearch',
                    },
                  ]}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right'
                }}
              >
                <Icon
                  style={{ width: 32, height: 32, marginBottom: 10 }}
                  component={!loading ? SendSvg : CancelSvg}
                  onClick={!loading ? handleSubmit : handleCancel}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Modal
        centered
        closable={false}
        maskClosable={false}
        open={open}
        footer={
          <div>
            <Button
              type='primary'
              loading={submitLoading}
              onClick={() => {
                setSubmitLoading(true)
                setTimeout(() => {
                  setSubmitLoading(false)
                  if (authCode === '595') {
                    messageApi.success('验证通过')
                    setOpen(false)
                  } else {
                    messageApi.error('验证令牌错误或已失效')
                  }
                }, 1000)
              }}
            >
              Go
            </Button>
          </div>
        }
      >
        内测令牌：
        <Input
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
          style={{ width: 120 }}
        />
      </Modal>
      {contextHolder}
    </>
  )
}

export default ChatInterface
