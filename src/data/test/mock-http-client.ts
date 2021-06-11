import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http/'

export class HttpPostClientSpy<TypeParams, TypeResponse> implements HttpPostClient<TypeParams, TypeResponse> {
  public url?: string
  public body?: TypeParams
  public response: HttpResponse<TypeResponse> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<TypeParams>): Promise<HttpResponse<TypeResponse>> {
    const { url, body } = params
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
