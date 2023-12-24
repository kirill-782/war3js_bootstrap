declare module "curl" {
    const handleId: unique symbol;

    interface CurlHandle extends Record<any, any> {
        [handleId]: unknown;
    }

    export function curl_easy_init(): CurlHandle;

    interface CurlOptToType {
        CURLOPT_URL: string;
        CURLOPT_DOH_URL: string;
        CURLOPT_USERNAME: string;
        CURLOPT_PASSWORD: string;
        CURLOPT_CUSTOMREQUEST: string;

        CURLOPT_AUTOREFERER: number;
        CURLOPT_CONNECT_ONLY: number;
        CURLOPT_MAXREDIRS: number;
        CURLOPT_SSL_VERIFYPEER: number;
        CURLOPT_SSL_VERIFYHOST: number;
        CURLOPT_NOPROGRESS: number;
        CURLOPT_POST: number;
        CURLOPT_POSTFIELDSIZE: number;
        CURLOPT_NOBODY: number;
        CURLOPT_CONNECTTIMEOUT: number;
        CURLOPT_CONNECTTIMEOUT_MS: number;
        CURLOPT_TIMEOUT: number;
        CURLOPT_TIMEOUT_MS: number;
        CURLOPT_LOW_SPEED_LIMIT: number;
        CURLOPT_LOW_SPEED_TIME: number;
        CURLOPT_POSTFIELDSIZE_LARGE: number;
        CURLOPT_MAX_SEND_SPEED_LARGE: number;
        CURLOPT_MAX_RECV_SPEED_LARGE: number;

        CURLOPT_WRITEFUNCTION: WriteCallback;
        CURLOPT_READFUNCTION: ReaadCallback;
        CURLOPT_SEEKFUNCTION: SeekCallback;
        CURLOPT_XFERINFOFUNCTION: ProgressCallback;
        CURLOPT_HEADERFUNCTION: HeaderCallback;
    }

    export type ReaadCallback = (this: CurlHandle, buffer: ArrayBuffer) => number;
    export type WriteCallback = (this: CurlHandle, buffer: ArrayBuffer) => number;
    export type HeaderCallback = (this: CurlHandle, buffer: ArrayBuffer) => number;
    export type ProgressCallback = (
        this: CurlHandle,
        dltotal: number,
        dlnow: number,
        ultotal: number,
        ulnow: number,
    ) => number;
    export type SeekCallback = (this: CurlHandle, ossfer: number, origin: number) => number;

    function curl_easy_setopt<T extends keyof CurlOptToType>(
        curl: CurlHandle,
        option: CurlOptConstants[T],
        value: CurlOptToType[T],
    ): void;

    export type PreformCallback = (
        this: CurlHandle,
        resultCode: CurlEConstants[keyof CurlEConstants],
        resultString: string,
    ) => void;

    export function curl_easy_perform(curl: CurlHandle, callback: PreformCallback): void;

    export function curl_easy_pause(curl: CurlHandle, bitmask: number): void;

    export function curl_easy_headers(
        curl: CurlHandle,
        origin: number,
        request: number,
    ): Record<string, string | Array<string>>;

    export function curl_easy_cleanup(curl: CurlHandle): void;

    export function curl_easy_reset(curl: CurlHandle): void;

    interface CurlInfoToType {
        CURLINFO_CONTENT_TYPE: string;
        CURLINFO_REFERER: string;

        CURLINFO_TOTAL_TIME_T: number;
        CURLINFO_NAMELOOKUP_TIME_T: number;
        CURLINFO_CONNECT_TIME_T: number;
        CURLINFO_APPCONNECT_TIME_T: number;
        CURLINFO_STARTTRANSFER_TIME_T: number;
        CURLINFO_REDIRECT_TIME_T: number;
        CURLINFO_SIZE_DOWNLOAD_T: number;
        CURLINFO_SPEED_DOWNLOAD_T: number;
        CURLINFO_CONTENT_LENGTH_DOWNLOAD_T: number;
        CURLINFO_CONTENT_LENGTH_UPLOAD_T: number;
        CURLINFO_RESPONSE_CODE: number;
        CURLINFO_REDIRECT_COUNT: number;
        CURLINFO_REQUEST_SIZE: number;
    }

    export function curl_easy_getinfo<T extends keyof CurlInfoToType>(
        curl: CurlHandle,
        info: CurlInfoConstants[T],
    ): CurlInfoToType[T];

    interface CurlRecvResult {
        result: CurlEConstants[keyof CurlEConstants];
        recv: number;
        bytesLeft: number;
        flags: number;
        len: number;
        offset: number;
    }

    export function curl_ws_recv(curl: CurlHandle, buffer: ArrayBuffer | Uint8Array): CurlRecvResult;

    export function curl_ws_send(
        curl: CurlHandle,
        buffer: ArrayBuffer | Uint8Array,
        fragsize: number,
        flags: number,
    ): void;

    export function update(): void;

    export const constants: CurlEConstants & CurlConstants & CurlInfoConstants & CurlOptConstants;

    type CurlEConstants = {
        readonly CURLE_OK: 0;
        readonly CURLE_UNSUPPORTED_PROTOCOL: 1;
        readonly CURLE_FAILED_INIT: 2;
        readonly CURLE_URL_MALFORMAT: 3;
        readonly CURLE_NOT_BUILT_IN: 4;
        readonly CURLE_COULDNT_RESOLVE_PROXY: 5;
        readonly CURLE_COULDNT_RESOLVE_HOST: 6;
        readonly CURLE_COULDNT_CONNECT: 7;
        readonly CURLE_WEIRD_SERVER_REPLY: 8;
        readonly CURLE_REMOTE_ACCESS_DENIED: 9;
        readonly CURLE_FTP_ACCEPT_FAILED: 10;
        readonly CURLE_FTP_WEIRD_PASS_REPLY: 11;
        readonly CURLE_FTP_ACCEPT_TIMEOUT: 12;
        readonly CURLE_FTP_WEIRD_PASV_REPLY: 13;
        readonly CURLE_FTP_WEIRD_227_FORMAT: 14;
        readonly CURLE_FTP_CANT_GET_HOST: 15;
        readonly CURLE_HTTP2: 16;
        readonly CURLE_FTP_COULDNT_SET_TYPE: 17;
        readonly CURLE_PARTIAL_FILE: 18;
        readonly CURLE_FTP_COULDNT_RETR_FILE: 19;
        readonly CURLE_OBSOLETE20: 20;
        readonly CURLE_QUOTE_ERROR: 21;
        readonly CURLE_HTTP_RETURNED_ERROR: 22;
        readonly CURLE_WRITE_ERROR: 23;
        readonly CURLE_OBSOLETE24: 24;
        readonly CURLE_UPLOAD_FAILED: 25;
        readonly CURLE_READ_ERROR: 26;
        readonly CURLE_OUT_OF_MEMORY: 27;
        readonly CURLE_OPERATION_TIMEDOUT: 28;
        readonly CURLE_OBSOLETE29: 29;
        readonly CURLE_FTP_PORT_FAILED: 30;
        readonly CURLE_FTP_COULDNT_USE_REST: 31;
        readonly CURLE_OBSOLETE32: 32;
        readonly CURLE_RANGE_ERROR: 33;
        readonly CURLE_HTTP_POST_ERROR: 34;
        readonly CURLE_SSL_CONNECT_ERROR: 35;
        readonly CURLE_BAD_DOWNLOAD_RESUME: 36;
        readonly CURLE_FILE_COULDNT_READ_FILE: 37;
        readonly CURLE_LDAP_CANNOT_BIND: 38;
        readonly CURLE_LDAP_SEARCH_FAILED: 39;
        readonly CURLE_OBSOLETE40: 40;
        readonly CURLE_FUNCTION_NOT_FOUND: 41;
        readonly CURLE_ABORTED_BY_CALLBACK: 42;
        readonly CURLE_BAD_FUNCTION_ARGUMENT: 43;
        readonly CURLE_OBSOLETE44: 44;
        readonly CURLE_INTERFACE_FAILED: 45;
        readonly CURLE_OBSOLETE46: 46;
        readonly CURLE_TOO_MANY_REDIRECTS: 47;
        readonly CURLE_UNKNOWN_OPTION: 48;
        readonly CURLE_SETOPT_OPTION_SYNTAX: 49;
        readonly CURLE_OBSOLETE50: 50;
        readonly CURLE_OBSOLETE51: 51;
        readonly CURLE_GOT_NOTHING: 52;
        readonly CURLE_SSL_ENGINE_NOTFOUND: 53;
        readonly CURLE_SSL_ENGINE_SETFAILED: 54;
        readonly CURLE_SEND_ERROR: 55;
        readonly CURLE_RECV_ERROR: 56;
        readonly CURLE_OBSOLETE57: 57;
        readonly CURLE_SSL_CERTPROBLEM: 58;
        readonly CURLE_SSL_CIPHER: 59;
        readonly CURLE_PEER_FAILED_VERIFICATION: 60;
        readonly CURLE_BAD_CONTENT_ENCODING: 61;
        readonly CURLE_OBSOLETE62: 62;
        readonly CURLE_FILESIZE_EXCEEDED: 63;
        readonly CURLE_USE_SSL_FAILED: 64;
        readonly CURLE_SEND_FAIL_REWIND: 65;
        readonly CURLE_SSL_ENGINE_INITFAILED: 66;
        readonly CURLE_LOGIN_DENIED: 67;
        readonly CURLE_TFTP_NOTFOUND: 68;
        readonly CURLE_TFTP_PERM: 69;
        readonly CURLE_REMOTE_DISK_FULL: 70;
        readonly CURLE_TFTP_ILLEGAL: 71;
        readonly CURLE_TFTP_UNKNOWNID: 72;
        readonly CURLE_REMOTE_FILE_EXISTS: 73;
        readonly CURLE_TFTP_NOSUCHUSER: 74;
        readonly CURLE_OBSOLETE75: 75;
        readonly CURLE_OBSOLETE76: 76;
        readonly CURLE_SSL_CACERT_BADFILE: 77;
        readonly CURLE_REMOTE_FILE_NOT_FOUND: 78;
        readonly CURLE_SSH: 79;
        readonly CURLE_SSL_SHUTDOWN_FAILED: 80;
        readonly CURLE_AGAIN: 81;
        readonly CURLE_SSL_CRL_BADFILE: 82;
        readonly CURLE_SSL_ISSUER_ERROR: 83;
        readonly CURLE_FTP_PRET_FAILED: 84;
        readonly CURLE_RTSP_CSEQ_ERROR: 85;
        readonly CURLE_RTSP_SESSION_ERROR: 86;
        readonly CURLE_FTP_BAD_FILE_LIST: 87;
        readonly CURLE_CHUNK_FAILED: 88;
        readonly CURLE_NO_CONNECTION_AVAILABLE: 89;
        readonly CURLE_SSL_PINNEDPUBKEYNOTMATCH: 90;
        readonly CURLE_SSL_INVALIDCERTSTATUS: 91;
        readonly CURLE_HTTP2_STREAM: 92;
        readonly CURLE_RECURSIVE_API_CALL: 93;
        readonly CURLE_AUTH_ERROR: 94;
        readonly CURLE_HTTP3: 95;
        readonly CURLE_QUIC_CONNECT_ERROR: 96;
        readonly CURLE_PROXY: 97;
        readonly CURLE_SSL_CLIENTCERT: 98;
        readonly CURLE_UNRECOVERABLE_POLL: 99;
    };

    type CurlConstants = {
        readonly CURL_WRITEFUNC_ERROR: number;
        readonly CURL_WRITEFUNC_PAUSE: number;
        readonly CURL_MAX_WRITE_SIZE: number;
        readonly CURL_MAX_HTTP_HEADER: number;
        readonly CURL_READFUNC_ABORT: number;
        readonly CURL_READFUNC_PAUSE: number;
        readonly CURL_SEEKFUNC_OK: number;
        readonly CURL_SEEKFUNC_FAIL: number;
        readonly CURL_SEEKFUNC_CANTSEEK: number;
        readonly CURLWS_TEXT: number;
        readonly CURLWS_BINARY: number;
        readonly CURLWS_CONT: number;
        readonly CURLWS_CLOSE: number;
        readonly CURLWS_PING: number;
        readonly CURLPAUSE_RECV: number;
        readonly CURLPAUSE_SEND: number;
        readonly CURLPAUSE_ALL: number;
        readonly CURLPAUSE_CONT: number;
        readonly CURLH_HEADER: number;
        readonly CURLH_TRAILER: number;
        readonly CURLH_CONNECT: number;
        readonly CURLH_1XX: number;
        readonly CURLH_PSEUDO: number;
    };

    type CurlInfoConstants = {
        readonly CURLINFO_NONE: unique symbol;
        readonly CURLINFO_EFFECTIVE_URL: unique symbol;
        readonly CURLINFO_RESPONSE_CODE: unique symbol;
        readonly CURLINFO_TOTAL_TIME: unique symbol;
        readonly CURLINFO_NAMELOOKUP_TIME: unique symbol;
        readonly CURLINFO_CONNECT_TIME: unique symbol;
        readonly CURLINFO_PRETRANSFER_TIME: unique symbol;
        readonly CURLINFO_SIZE_UPLOAD: unique symbol;
        readonly CURLINFO_SIZE_UPLOAD_T: unique symbol;
        readonly CURLINFO_SIZE_DOWNLOAD: unique symbol;
        readonly CURLINFO_SIZE_DOWNLOAD_T: unique symbol;
        readonly CURLINFO_SPEED_DOWNLOAD: unique symbol;
        readonly CURLINFO_SPEED_DOWNLOAD_T: unique symbol;
        readonly CURLINFO_SPEED_UPLOAD: unique symbol;
        readonly CURLINFO_SPEED_UPLOAD_T: unique symbol;
        readonly CURLINFO_HEADER_SIZE: unique symbol;
        readonly CURLINFO_REQUEST_SIZE: unique symbol;
        readonly CURLINFO_SSL_VERIFYRESULT: unique symbol;
        readonly CURLINFO_FILETIME: unique symbol;
        readonly CURLINFO_FILETIME_T: unique symbol;
        readonly CURLINFO_CONTENT_LENGTH_DOWNLOAD: unique symbol;
        readonly CURLINFO_CONTENT_LENGTH_DOWNLOAD_T: unique symbol;
        readonly CURLINFO_CONTENT_LENGTH_UPLOAD: unique symbol;
        readonly CURLINFO_CONTENT_LENGTH_UPLOAD_T: unique symbol;
        readonly CURLINFO_STARTTRANSFER_TIME: unique symbol;
        readonly CURLINFO_CONTENT_TYPE: unique symbol;
        readonly CURLINFO_REDIRECT_TIME: unique symbol;
        readonly CURLINFO_REDIRECT_COUNT: unique symbol;
        readonly CURLINFO_PRIVATE: unique symbol;
        readonly CURLINFO_HTTP_CONNECTCODE: unique symbol;
        readonly CURLINFO_HTTPAUTH_AVAIL: unique symbol;
        readonly CURLINFO_PROXYAUTH_AVAIL: unique symbol;
        readonly CURLINFO_OS_ERRNO: unique symbol;
        readonly CURLINFO_NUM_CONNECTS: unique symbol;
        readonly CURLINFO_SSL_ENGINES: unique symbol;
        readonly CURLINFO_COOKIELIST: unique symbol;
        readonly CURLINFO_LASTSOCKET: unique symbol;
        readonly CURLINFO_FTP_ENTRY_PATH: unique symbol;
        readonly CURLINFO_REDIRECT_URL: unique symbol;
        readonly CURLINFO_PRIMARY_IP: unique symbol;
        readonly CURLINFO_APPCONNECT_TIME: unique symbol;
        readonly CURLINFO_CERTINFO: unique symbol;
        readonly CURLINFO_CONDITION_UNMET: unique symbol;
        readonly CURLINFO_RTSP_SESSION_ID: unique symbol;
        readonly CURLINFO_RTSP_CLIENT_CSEQ: unique symbol;
        readonly CURLINFO_RTSP_SERVER_CSEQ: unique symbol;
        readonly CURLINFO_RTSP_CSEQ_RECV: unique symbol;
        readonly CURLINFO_PRIMARY_PORT: unique symbol;
        readonly CURLINFO_LOCAL_IP: unique symbol;
        readonly CURLINFO_LOCAL_PORT: unique symbol;
        readonly CURLINFO_TLS_SESSION: unique symbol;
        readonly CURLINFO_ACTIVESOCKET: unique symbol;
        readonly CURLINFO_TLS_SSL_PTR: unique symbol;
        readonly CURLINFO_HTTP_VERSION: unique symbol;
        readonly CURLINFO_PROXY_SSL_VERIFYRESULT: unique symbol;
        readonly CURLINFO_PROTOCOL: unique symbol;
        readonly CURLINFO_SCHEME: unique symbol;
        readonly CURLINFO_TOTAL_TIME_T: unique symbol;
        readonly CURLINFO_NAMELOOKUP_TIME_T: unique symbol;
        readonly CURLINFO_CONNECT_TIME_T: unique symbol;
        readonly CURLINFO_PRETRANSFER_TIME_T: unique symbol;
        readonly CURLINFO_STARTTRANSFER_TIME_T: unique symbol;
        readonly CURLINFO_REDIRECT_TIME_T: unique symbol;
        readonly CURLINFO_APPCONNECT_TIME_T: unique symbol;
        readonly CURLINFO_RETRY_AFTER: unique symbol;
        readonly CURLINFO_EFFECTIVE_METHOD: unique symbol;
        readonly CURLINFO_PROXY_ERROR: unique symbol;
        readonly CURLINFO_REFERER: unique symbol;
        readonly CURLINFO_CAINFO: unique symbol;
        readonly CURLINFO_CAPATH: unique symbol;
        readonly CURLINFO_XFER_ID: unique symbol;
        readonly CURLINFO_CONN_ID: unique symbol;
        readonly CURLINFO_LASTONE: unique symbol;
    };

    type CurlOptConstants = {
        readonly CURLOPT_WRITEDATA: unique symbol;
        readonly CURLOPT_URL: unique symbol;
        readonly CURLOPT_PORT: unique symbol;
        readonly CURLOPT_PROXY: unique symbol;
        readonly CURLOPT_USERPWD: unique symbol;
        readonly CURLOPT_PROXYUSERPWD: unique symbol;
        readonly CURLOPT_RANGE: unique symbol;
        readonly CURLOPT_READDATA: unique symbol;
        readonly CURLOPT_ERRORBUFFER: unique symbol;
        readonly CURLOPT_WRITEFUNCTION: unique symbol;
        readonly CURLOPT_READFUNCTION: unique symbol;
        readonly CURLOPT_TIMEOUT: unique symbol;
        readonly CURLOPT_INFILESIZE: unique symbol;
        readonly CURLOPT_POSTFIELDS: unique symbol;
        readonly CURLOPT_REFERER: unique symbol;
        readonly CURLOPT_FTPPORT: unique symbol;
        readonly CURLOPT_USERAGENT: unique symbol;
        readonly CURLOPT_LOW_SPEED_LIMIT: unique symbol;
        readonly CURLOPT_LOW_SPEED_TIME: unique symbol;
        readonly CURLOPT_RESUME_FROM: unique symbol;
        readonly CURLOPT_COOKIE: unique symbol;
        readonly CURLOPT_HTTPHEADER: unique symbol;
        readonly CURLOPT_HTTPPOST: unique symbol;
        readonly CURLOPT_SSLCERT: unique symbol;
        readonly CURLOPT_KEYPASSWD: unique symbol;
        readonly CURLOPT_CRLF: unique symbol;
        readonly CURLOPT_QUOTE: unique symbol;
        readonly CURLOPT_HEADERDATA: unique symbol;
        readonly CURLOPT_COOKIEFILE: unique symbol;
        readonly CURLOPT_SSLVERSION: unique symbol;
        readonly CURLOPT_TIMECONDITION: unique symbol;
        readonly CURLOPT_TIMEVALUE: unique symbol;
        readonly CURLOPT_CUSTOMREQUEST: unique symbol;
        readonly CURLOPT_STDERR: unique symbol;
        readonly CURLOPT_POSTQUOTE: unique symbol;
        readonly CURLOPT_OBSOLETE40: unique symbol;
        readonly CURLOPT_VERBOSE: unique symbol;
        readonly CURLOPT_HEADER: unique symbol;
        readonly CURLOPT_NOPROGRESS: unique symbol;
        readonly CURLOPT_NOBODY: unique symbol;
        readonly CURLOPT_FAILONERROR: unique symbol;
        readonly CURLOPT_UPLOAD: unique symbol;
        readonly CURLOPT_POST: unique symbol;
        readonly CURLOPT_DIRLISTONLY: unique symbol;
        readonly CURLOPT_APPEND: unique symbol;
        readonly CURLOPT_NETRC: unique symbol;
        readonly CURLOPT_FOLLOWLOCATION: unique symbol;
        readonly CURLOPT_TRANSFERTEXT: unique symbol;
        readonly CURLOPT_PUT: unique symbol;
        readonly CURLOPT_PROGRESSFUNCTION: unique symbol;
        readonly CURLOPT_XFERINFODATA: unique symbol;
        readonly CURLOPT_AUTOREFERER: unique symbol;
        readonly CURLOPT_PROXYPORT: unique symbol;
        readonly CURLOPT_POSTFIELDSIZE: unique symbol;
        readonly CURLOPT_HTTPPROXYTUNNEL: unique symbol;
        readonly CURLOPT_INTERFACE: unique symbol;
        readonly CURLOPT_KRBLEVEL: unique symbol;
        readonly CURLOPT_SSL_VERIFYPEER: unique symbol;
        readonly CURLOPT_CAINFO: unique symbol;
        readonly CURLOPT_MAXREDIRS: unique symbol;
        readonly CURLOPT_FILETIME: unique symbol;
        readonly CURLOPT_TELNETOPTIONS: unique symbol;
        readonly CURLOPT_MAXCONNECTS: unique symbol;
        readonly CURLOPT_OBSOLETE72: unique symbol;
        readonly CURLOPT_FRESH_CONNECT: unique symbol;
        readonly CURLOPT_FORBID_REUSE: unique symbol;
        readonly CURLOPT_RANDOM_FILE: unique symbol;
        readonly CURLOPT_EGDSOCKET: unique symbol;
        readonly CURLOPT_CONNECTTIMEOUT: unique symbol;
        readonly CURLOPT_HEADERFUNCTION: unique symbol;
        readonly CURLOPT_HTTPGET: unique symbol;
        readonly CURLOPT_SSL_VERIFYHOST: unique symbol;
        readonly CURLOPT_COOKIEJAR: unique symbol;
        readonly CURLOPT_SSL_CIPHER_LIST: unique symbol;
        readonly CURLOPT_HTTP_VERSION: unique symbol;
        readonly CURLOPT_FTP_USE_EPSV: unique symbol;
        readonly CURLOPT_SSLCERTTYPE: unique symbol;
        readonly CURLOPT_SSLKEY: unique symbol;
        readonly CURLOPT_SSLKEYTYPE: unique symbol;
        readonly CURLOPT_SSLENGINE: unique symbol;
        readonly CURLOPT_SSLENGINE_DEFAULT: unique symbol;
        readonly CURLOPT_DNS_USE_GLOBAL_CACHE: unique symbol;
        readonly CURLOPT_DNS_CACHE_TIMEOUT: unique symbol;
        readonly CURLOPT_PREQUOTE: unique symbol;
        readonly CURLOPT_DEBUGFUNCTION: unique symbol;
        readonly CURLOPT_DEBUGDATA: unique symbol;
        readonly CURLOPT_COOKIESESSION: unique symbol;
        readonly CURLOPT_CAPATH: unique symbol;
        readonly CURLOPT_BUFFERSIZE: unique symbol;
        readonly CURLOPT_NOSIGNAL: unique symbol;
        readonly CURLOPT_SHARE: unique symbol;
        readonly CURLOPT_PROXYTYPE: unique symbol;
        readonly CURLOPT_ACCEPT_ENCODING: unique symbol;
        readonly CURLOPT_PRIVATE: unique symbol;
        readonly CURLOPT_HTTP200ALIASES: unique symbol;
        readonly CURLOPT_UNRESTRICTED_AUTH: unique symbol;
        readonly CURLOPT_FTP_USE_EPRT: unique symbol;
        readonly CURLOPT_HTTPAUTH: unique symbol;
        readonly CURLOPT_SSL_CTX_FUNCTION: unique symbol;
        readonly CURLOPT_SSL_CTX_DATA: unique symbol;
        readonly CURLOPT_FTP_CREATE_MISSING_DIRS: unique symbol;
        readonly CURLOPT_PROXYAUTH: unique symbol;
        readonly CURLOPT_SERVER_RESPONSE_TIMEOUT: unique symbol;
        readonly CURLOPT_IPRESOLVE: unique symbol;
        readonly CURLOPT_MAXFILESIZE: unique symbol;
        readonly CURLOPT_INFILESIZE_LARGE: unique symbol;
        readonly CURLOPT_RESUME_FROM_LARGE: unique symbol;
        readonly CURLOPT_MAXFILESIZE_LARGE: unique symbol;
        readonly CURLOPT_NETRC_FILE: unique symbol;
        readonly CURLOPT_USE_SSL: unique symbol;
        readonly CURLOPT_POSTFIELDSIZE_LARGE: unique symbol;
        readonly CURLOPT_TCP_NODELAY: unique symbol;
        readonly CURLOPT_FTPSSLAUTH: unique symbol;
        readonly CURLOPT_IOCTLFUNCTION: unique symbol;
        readonly CURLOPT_IOCTLDATA: unique symbol;
        readonly CURLOPT_FTP_ACCOUNT: unique symbol;
        readonly CURLOPT_COOKIELIST: unique symbol;
        readonly CURLOPT_IGNORE_CONTENT_LENGTH: unique symbol;
        readonly CURLOPT_FTP_SKIP_PASV_IP: unique symbol;
        readonly CURLOPT_FTP_FILEMETHOD: unique symbol;
        readonly CURLOPT_LOCALPORT: unique symbol;
        readonly CURLOPT_LOCALPORTRANGE: unique symbol;
        readonly CURLOPT_CONNECT_ONLY: unique symbol;
        readonly CURLOPT_CONV_FROM_NETWORK_FUNCTION: unique symbol;
        readonly CURLOPT_CONV_TO_NETWORK_FUNCTION: unique symbol;
        readonly CURLOPT_CONV_FROM_UTF8_FUNCTION: unique symbol;
        readonly CURLOPT_MAX_SEND_SPEED_LARGE: unique symbol;
        readonly CURLOPT_MAX_RECV_SPEED_LARGE: unique symbol;
        readonly CURLOPT_FTP_ALTERNATIVE_TO_USER: unique symbol;
        readonly CURLOPT_SOCKOPTFUNCTION: unique symbol;
        readonly CURLOPT_SOCKOPTDATA: unique symbol;
        readonly CURLOPT_SSL_SESSIONID_CACHE: unique symbol;
        readonly CURLOPT_SSH_AUTH_TYPES: unique symbol;
        readonly CURLOPT_SSH_PUBLIC_KEYFILE: unique symbol;
        readonly CURLOPT_SSH_PRIVATE_KEYFILE: unique symbol;
        readonly CURLOPT_FTP_SSL_CCC: unique symbol;
        readonly CURLOPT_TIMEOUT_MS: unique symbol;
        readonly CURLOPT_CONNECTTIMEOUT_MS: unique symbol;
        readonly CURLOPT_HTTP_TRANSFER_DECODING: unique symbol;
        readonly CURLOPT_HTTP_CONTENT_DECODING: unique symbol;
        readonly CURLOPT_NEW_FILE_PERMS: unique symbol;
        readonly CURLOPT_NEW_DIRECTORY_PERMS: unique symbol;
        readonly CURLOPT_POSTREDIR: unique symbol;
        readonly CURLOPT_SSH_HOST_PUBLIC_KEY_MD5: unique symbol;
        readonly CURLOPT_OPENSOCKETFUNCTION: unique symbol;
        readonly CURLOPT_OPENSOCKETDATA: unique symbol;
        readonly CURLOPT_COPYPOSTFIELDS: unique symbol;
        readonly CURLOPT_PROXY_TRANSFER_MODE: unique symbol;
        readonly CURLOPT_SEEKFUNCTION: unique symbol;
        readonly CURLOPT_SEEKDATA: unique symbol;
        readonly CURLOPT_CRLFILE: unique symbol;
        readonly CURLOPT_ISSUERCERT: unique symbol;
        readonly CURLOPT_ADDRESS_SCOPE: unique symbol;
        readonly CURLOPT_CERTINFO: unique symbol;
        readonly CURLOPT_USERNAME: unique symbol;
        readonly CURLOPT_PASSWORD: unique symbol;
        readonly CURLOPT_PROXYUSERNAME: unique symbol;
        readonly CURLOPT_PROXYPASSWORD: unique symbol;
        readonly CURLOPT_NOPROXY: unique symbol;
        readonly CURLOPT_TFTP_BLKSIZE: unique symbol;
        readonly CURLOPT_SOCKS5_GSSAPI_SERVICE: unique symbol;
        readonly CURLOPT_SOCKS5_GSSAPI_NEC: unique symbol;
        readonly CURLOPT_PROTOCOLS: unique symbol;
        readonly CURLOPT_REDIR_PROTOCOLS: unique symbol;
        readonly CURLOPT_SSH_KNOWNHOSTS: unique symbol;
        readonly CURLOPT_SSH_KEYFUNCTION: unique symbol;
        readonly CURLOPT_SSH_KEYDATA: unique symbol;
        readonly CURLOPT_MAIL_FROM: unique symbol;
        readonly CURLOPT_MAIL_RCPT: unique symbol;
        readonly CURLOPT_FTP_USE_PRET: unique symbol;
        readonly CURLOPT_RTSP_REQUEST: unique symbol;
        readonly CURLOPT_RTSP_SESSION_ID: unique symbol;
        readonly CURLOPT_RTSP_STREAM_URI: unique symbol;
        readonly CURLOPT_RTSP_TRANSPORT: unique symbol;
        readonly CURLOPT_RTSP_CLIENT_CSEQ: unique symbol;
        readonly CURLOPT_RTSP_SERVER_CSEQ: unique symbol;
        readonly CURLOPT_INTERLEAVEDATA: unique symbol;
        readonly CURLOPT_INTERLEAVEFUNCTION: unique symbol;
        readonly CURLOPT_WILDCARDMATCH: unique symbol;
        readonly CURLOPT_CHUNK_BGN_FUNCTION: unique symbol;
        readonly CURLOPT_CHUNK_END_FUNCTION: unique symbol;
        readonly CURLOPT_FNMATCH_FUNCTION: unique symbol;
        readonly CURLOPT_CHUNK_DATA: unique symbol;
        readonly CURLOPT_FNMATCH_DATA: unique symbol;
        readonly CURLOPT_RESOLVE: unique symbol;
        readonly CURLOPT_TLSAUTH_USERNAME: unique symbol;
        readonly CURLOPT_TLSAUTH_PASSWORD: unique symbol;
        readonly CURLOPT_TLSAUTH_TYPE: unique symbol;
        readonly CURLOPT_TRANSFER_ENCODING: unique symbol;
        readonly CURLOPT_CLOSESOCKETFUNCTION: unique symbol;
        readonly CURLOPT_CLOSESOCKETDATA: unique symbol;
        readonly CURLOPT_GSSAPI_DELEGATION: unique symbol;
        readonly CURLOPT_DNS_SERVERS: unique symbol;
        readonly CURLOPT_ACCEPTTIMEOUT_MS: unique symbol;
        readonly CURLOPT_TCP_KEEPALIVE: unique symbol;
        readonly CURLOPT_TCP_KEEPIDLE: unique symbol;
        readonly CURLOPT_TCP_KEEPINTVL: unique symbol;
        readonly CURLOPT_SSL_OPTIONS: unique symbol;
        readonly CURLOPT_MAIL_AUTH: unique symbol;
        readonly CURLOPT_SASL_IR: unique symbol;
        readonly CURLOPT_XFERINFOFUNCTION: unique symbol;
        readonly CURLOPT_XOAUTH2_BEARER: unique symbol;
        readonly CURLOPT_DNS_INTERFACE: unique symbol;
        readonly CURLOPT_DNS_LOCAL_IP4: unique symbol;
        readonly CURLOPT_DNS_LOCAL_IP6: unique symbol;
        readonly CURLOPT_LOGIN_OPTIONS: unique symbol;
        readonly CURLOPT_SSL_ENABLE_NPN: unique symbol;
        readonly CURLOPT_SSL_ENABLE_ALPN: unique symbol;
        readonly CURLOPT_EXPECT_100_TIMEOUT_MS: unique symbol;
        readonly CURLOPT_PROXYHEADER: unique symbol;
        readonly CURLOPT_HEADEROPT: unique symbol;
        readonly CURLOPT_PINNEDPUBLICKEY: unique symbol;
        readonly CURLOPT_UNIX_SOCKET_PATH: unique symbol;
        readonly CURLOPT_SSL_VERIFYSTATUS: unique symbol;
        readonly CURLOPT_SSL_FALSESTART: unique symbol;
        readonly CURLOPT_PATH_AS_IS: unique symbol;
        readonly CURLOPT_PROXY_SERVICE_NAME: unique symbol;
        readonly CURLOPT_SERVICE_NAME: unique symbol;
        readonly CURLOPT_PIPEWAIT: unique symbol;
        readonly CURLOPT_DEFAULT_PROTOCOL: unique symbol;
        readonly CURLOPT_STREAM_WEIGHT: unique symbol;
        readonly CURLOPT_STREAM_DEPENDS: unique symbol;
        readonly CURLOPT_STREAM_DEPENDS_E: unique symbol;
        readonly CURLOPT_TFTP_NO_OPTIONS: unique symbol;
        readonly CURLOPT_CONNECT_TO: unique symbol;
        readonly CURLOPT_TCP_FASTOPEN: unique symbol;
        readonly CURLOPT_KEEP_SENDING_ON_ERROR: unique symbol;
        readonly CURLOPT_PROXY_CAINFO: unique symbol;
        readonly CURLOPT_PROXY_CAPATH: unique symbol;
        readonly CURLOPT_PROXY_SSL_VERIFYPEER: unique symbol;
        readonly CURLOPT_PROXY_SSL_VERIFYHOST: unique symbol;
        readonly CURLOPT_PROXY_SSLVERSION: unique symbol;
        readonly CURLOPT_PROXY_TLSAUTH_USERNAME: unique symbol;
        readonly CURLOPT_PROXY_TLSAUTH_PASSWORD: unique symbol;
        readonly CURLOPT_PROXY_TLSAUTH_TYPE: unique symbol;
        readonly CURLOPT_PROXY_SSLCERT: unique symbol;
        readonly CURLOPT_PROXY_SSLCERTTYPE: unique symbol;
        readonly CURLOPT_PROXY_SSLKEY: unique symbol;
        readonly CURLOPT_PROXY_SSLKEYTYPE: unique symbol;
        readonly CURLOPT_PROXY_KEYPASSWD: unique symbol;
        readonly CURLOPT_PROXY_SSL_CIPHER_LIST: unique symbol;
        readonly CURLOPT_PROXY_CRLFILE: unique symbol;
        readonly CURLOPT_PROXY_SSL_OPTIONS: unique symbol;
        readonly CURLOPT_PRE_PROXY: unique symbol;
        readonly CURLOPT_PROXY_PINNEDPUBLICKEY: unique symbol;
        readonly CURLOPT_ABSTRACT_UNIX_SOCKET: unique symbol;
        readonly CURLOPT_SUPPRESS_CONNECT_HEADERS: unique symbol;
        readonly CURLOPT_REQUEST_TARGET: unique symbol;
        readonly CURLOPT_SOCKS5_AUTH: unique symbol;
        readonly CURLOPT_SSH_COMPRESSION: unique symbol;
        readonly CURLOPT_MIMEPOST: unique symbol;
        readonly CURLOPT_TIMEVALUE_LARGE: unique symbol;
        readonly CURLOPT_HAPPY_EYEBALLS_TIMEOUT_MS: unique symbol;
        readonly CURLOPT_RESOLVER_START_FUNCTION: unique symbol;
        readonly CURLOPT_RESOLVER_START_DATA: unique symbol;
        readonly CURLOPT_HAPROXYPROTOCOL: unique symbol;
        readonly CURLOPT_DNS_SHUFFLE_ADDRESSES: unique symbol;
        readonly CURLOPT_TLS13_CIPHERS: unique symbol;
        readonly CURLOPT_PROXY_TLS13_CIPHERS: unique symbol;
        readonly CURLOPT_DISALLOW_USERNAME_IN_URL: unique symbol;
        readonly CURLOPT_DOH_URL: unique symbol;
        readonly CURLOPT_UPLOAD_BUFFERSIZE: unique symbol;
        readonly CURLOPT_UPKEEP_INTERVAL_MS: unique symbol;
        readonly CURLOPT_CURLU: unique symbol;
        readonly CURLOPT_TRAILERFUNCTION: unique symbol;
        readonly CURLOPT_TRAILERDATA: unique symbol;
        readonly CURLOPT_HTTP09_ALLOWED: unique symbol;
        readonly CURLOPT_ALTSVC_CTRL: unique symbol;
        readonly CURLOPT_ALTSVC: unique symbol;
        readonly CURLOPT_MAXAGE_CONN: unique symbol;
        readonly CURLOPT_SASL_AUTHZID: unique symbol;
        readonly CURLOPT_MAIL_RCPT_ALLOWFAILS: unique symbol;
        readonly CURLOPT_SSLCERT_BLOB: unique symbol;
        readonly CURLOPT_SSLKEY_BLOB: unique symbol;
        readonly CURLOPT_PROXY_SSLCERT_BLOB: unique symbol;
        readonly CURLOPT_PROXY_SSLKEY_BLOB: unique symbol;
        readonly CURLOPT_ISSUERCERT_BLOB: unique symbol;
        readonly CURLOPT_PROXY_ISSUERCERT: unique symbol;
        readonly CURLOPT_PROXY_ISSUERCERT_BLOB: unique symbol;
        readonly CURLOPT_SSL_EC_CURVES: unique symbol;
        readonly CURLOPT_HSTS_CTRL: unique symbol;
        readonly CURLOPT_HSTS: unique symbol;
        readonly CURLOPT_HSTSREADFUNCTION: unique symbol;
        readonly CURLOPT_HSTSREADDATA: unique symbol;
        readonly CURLOPT_HSTSWRITEFUNCTION: unique symbol;
        readonly CURLOPT_HSTSWRITEDATA: unique symbol;
        readonly CURLOPT_AWS_SIGV4: unique symbol;
        readonly CURLOPT_DOH_SSL_VERIFYPEER: unique symbol;
        readonly CURLOPT_DOH_SSL_VERIFYHOST: unique symbol;
        readonly CURLOPT_DOH_SSL_VERIFYSTATUS: unique symbol;
        readonly CURLOPT_CAINFO_BLOB: unique symbol;
        readonly CURLOPT_PROXY_CAINFO_BLOB: unique symbol;
        readonly CURLOPT_SSH_HOST_PUBLIC_KEY_SHA256: unique symbol;
        readonly CURLOPT_PREREQFUNCTION: unique symbol;
        readonly CURLOPT_PREREQDATA: unique symbol;
        readonly CURLOPT_MAXLIFETIME_CONN: unique symbol;
        readonly CURLOPT_MIME_OPTIONS: unique symbol;
        readonly CURLOPT_SSH_HOSTKEYFUNCTION: unique symbol;
        readonly CURLOPT_SSH_HOSTKEYDATA: unique symbol;
        readonly CURLOPT_PROTOCOLS_STR: unique symbol;
        readonly CURLOPT_REDIR_PROTOCOLS_STR: unique symbol;
        readonly CURLOPT_WS_OPTIONS: unique symbol;
        readonly CURLOPT_CA_CACHE_TIMEOUT: unique symbol;
        readonly CURLOPT_QUICK_EXIT: unique symbol;
        readonly CURLOPT_HAPROXY_CLIENT_IP: unique symbol;
        readonly CURLOPT_LASTENTRY: unique symbol;
    };
}
